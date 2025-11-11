import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString, IsEnum } from 'class-validator';

import { ProductCategory, SortOrder } from '../enums';

export class QueryProductsDto {
  @ApiPropertyOptional({ example: 'earbuds' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ProductCategory,
    example: ProductCategory.ELECTRONICS,
  })
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @ApiPropertyOptional({ example: '0' })
  @IsOptional()
  @IsString()
  minPrice?: string;

  @ApiPropertyOptional({ example: '200' })
  @IsOptional()
  @IsString()
  maxPrice?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    example: SortOrder.PRICE_ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sort?: SortOrder;
}
