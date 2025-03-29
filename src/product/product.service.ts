import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { extname } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly minioService: MinioService,
  ) {}

  async createProduct(
    dto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<Product> {
    // Rename dengan timestamp agar unik
    const fileExt = extname(file.originalname);
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${fileExt}`;
    const files = `products/${uniqueFileName}`;

    // Upload ke MinIO
    await this.minioService.uploadFile(
      'my-bucket',
      files,
      file.buffer,
      file.mimetype,
    );

    const newbody = {
      ...dto,
      image_url: files,
    };
    const product = this.productRepository.create(newbody);
    const dt = await this.productRepository.save(product);
    const signedUrl = await this.minioService.getSignedUrl(
      'my-bucket',
      files,
      3600,
    );

    return {
      ...dt,
      image_url: signedUrl,
    };
  }

  async getAllProducts(
    page: number,
    limit: number,
    sort: 'ASC' | 'DESC',
    search: string,
  ) {
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    if (!sort) {
      sort = 'ASC';
    }

    const products = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: sort,
      },
      where: search
        ? [
            { name: ILike(`%${search}%`) },
            { description: ILike(`%${search}%`) },
          ]
        : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        image_url: true,
        created_at: true,
        updated_at: true,
      },
    });
    const totalProducts = await this.productRepository.count({
      where: search
        ? [
            { name: ILike(`%${search}%`) },
            { description: ILike(`%${search}%`) },
          ]
        : undefined,
    });

    const dt = await Promise.all(
      products.map(async (product) => {
        if (product.image_url) {
          product.image_url = await this.minioService.getSignedUrl(
            'my-bucket',
            product.image_url,
            3600,
          );
        }
        return product;
      }),
    );

    return {
      items: dt,
      pagination: {
        totalItems: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1,
        nextPage: page < Math.ceil(totalProducts / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        limit: limit,
      },
    };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    if (product.image_url) {
      product.image_url = await this.minioService.getSignedUrl(
        'my-bucket',
        product.image_url,
        3600,
      );
    }

    return product;
  }

  // TODO: NEED TO FIX
  async updateProduct(
    id: string,
    dto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.getProductById(id);

    if (file) {
      const fileExt = file.originalname.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
      await this.minioService.uploadFile(
        'product-images',
        uniqueFileName,
        file.buffer,
        file.mimetype,
      );
      product.image_url = `product-images/${uniqueFileName}`;
    }

    Object.assign(product, dto);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.getProductById(id);
    if (product.image_url) {
      await this.minioService.deleteFile('my-bucket', product.image_url);
    }
    await this.productRepository.remove(product);
  }
}
