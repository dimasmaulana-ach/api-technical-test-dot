import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
