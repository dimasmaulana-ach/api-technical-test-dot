import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_PUBLIC_HOST, // Ganti sesuai env dari Railway
      port: Number(process.env.MINIO_PUBLIC_PORT),
      useSSL: true, // Railway biasanya pakai HTTPS
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
    });
  }

  async onModuleInit() {
    console.log('🔹 MinIO Service Initialized');
  }

  // Cek apakah bucket ada, kalau tidak, buat bucket baru
  async ensureBucketExists(bucketName: string) {
    const exists = await this.minioClient.bucketExists(bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`✅ Bucket '${bucketName}' created`);
    }
  }
  async uploadFile(
    bucketName: string,
    fileName: string,
    fileBuffer: Buffer,
    mimeType: string,
  ) {
    await this.ensureBucketExists(bucketName);
    await this.minioClient.putObject(
      bucketName,
      fileName,
      fileBuffer,
      undefined,
      {
        'Content-Type': mimeType,
      },
    );
  }

  async getSignedUrl(bucketName: string, fileName: string, expiresIn = 60) {
    const url = await this.minioClient.presignedUrl(
      'GET',
      bucketName,
      fileName,
      expiresIn,
    );

    // Tambahkan parameter agar file ditampilkan langsung di browser
    return url;
  }

  async deleteFile(bucketName: string, fileName: string) {
    await this.minioClient.removeObject(bucketName, fileName);
  }
}
