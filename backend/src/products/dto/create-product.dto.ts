import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Earbuds',
    description: 'Product title',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'High-quality wireless earbuds with noise cancellation and long battery life.',
    description: 'Detailed description of the product',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'https://example.com/images/earbuds.jpg',
    description: 'Image URL of the product',
  })
  @IsString()
  readonly image: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Product category',
  })
  @IsString()
  readonly category: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the product in USD',
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: true,
    description: 'Availability status (true = in stock, false = out of stock)',
  })
  @IsBoolean()
  readonly availability: boolean;

  @ApiProperty({
    example: 'wireless-earbuds',
    description: 'Slug (auto-generated from title, can be optional)',
  })
  @IsOptional()
  @IsString()
  readonly slug?: string;
}
