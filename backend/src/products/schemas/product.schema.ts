import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { HydratedDocument } from 'mongoose';

import { ProductCategory } from '../enums';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'Wireless Earbuds' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'High-quality earbuds with ANC' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'https://example.com/earbuds.jpg' })
  @Prop({ required: true })
  image: string;

  @ApiProperty({ enum: ProductCategory, example: ProductCategory.ELECTRONICS })
  @Prop({ required: true, enum: ProductCategory })
  category: ProductCategory;

  @ApiProperty({ example: 99.99 })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ example: true })
  @Prop({ required: true })
  availability: boolean;

  @ApiProperty({ example: 'wireless-earbuds' })
  @Prop({ required: true, unique: true })
  slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
