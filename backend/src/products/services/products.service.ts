import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import slugify from 'slugify';

import { CreateProductDto } from '../dto/create-product.dto';
import { QueryProductsDto } from '../dto/query-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product, ProductDocument } from '../schemas/product.schema';
import { buildProductQuery } from '../utils/build-product-query';

/**
 * Service for managing products in the catalog
 * Provides CRUD operations and product querying functionality
 */
@Injectable()
export class ProductsService {
  /**
   * Creates an instance of ProductsService
   * @param productModel - Injected Mongoose model for Product collection
   */
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  /**
   * Creates a new product in the database
   * @param dto - The product data to create
   * @returns The created product with generated slug
   * @throws {ValidationError} When dto validation fails
   */
  public async create(dto: CreateProductDto): Promise<Product> {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const product = new this.productModel({ ...dto, slug });

    return product.save();
  }

  /**
   * Retrieves all products with optional filtering and sorting
   * @param query - Query parameters for filtering and sorting products
   * @returns Array of products matching the query criteria
   */
  public async findAll(query: QueryProductsDto): Promise<Product[]> {
    const { filter, sortOption } = buildProductQuery(query);
    return this.productModel.find(filter).sort(sortOption).exec();
  }

  /**
   * Finds a single product by its slug
   * @param slug - The unique slug identifier for the product
   * @returns The product with the specified slug
   * @throws {NotFoundException} When product with the given slug is not found
   */
  public async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug }).exec();

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }

    return product;
  }

  /**
   * Updates an existing product by ID
   * @param id - The MongoDB ObjectId of the product to update
   * @param dto - The partial product data to update
   * @returns The updated product
   * @throws {NotFoundException} When product with the given ID is not found
   */
  public async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();

    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return product;
  }

  /**
   * Removes a product from the database by ID
   * @param id - The MongoDB ObjectId of the product to delete
   * @returns Promise that resolves when the product is deleted
   * @throws {NotFoundException} When product with the given ID is not found
   */
  public async remove(id: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }
  }
}
