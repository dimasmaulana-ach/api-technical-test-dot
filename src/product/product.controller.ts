import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MinioService } from 'src/minio/minio.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly minioService: MinioService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const dt = await this.productService.createProduct(dto, file);
    return {
      message: 'Product created successfully',
      data: dt,
    };
  }

  @Get()
  async getAllProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: 'ASC' | 'DESC',
    @Query('search') search: string,
  ) {
    const dt = await this.productService.getAllProducts(
      page,
      limit,
      sort,
      search,
    );
    return {
      message: 'Products retrieved successfully',
      data: dt,
    };
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const dt = await this.productService.getProductById(id);
    return {
      message: 'Product retrieved successfully',
      data: dt,
    };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const dt = await this.productService.updateProduct(id, dto, file);
    return {
      message: 'Product updated successfully',
      data: dt,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const dt = await this.productService.deleteProduct(id);
    return {
      message: 'Product deleted successfully',
      data: dt,
    };
  }
}
