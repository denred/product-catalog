import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, type TestingModule } from '@nestjs/testing';

import { ProductCategory, SortOrder } from '../enums';
import { Product } from '../schemas/product.schema';

import { ProductsService } from './products.service';

import type { CreateProductDto } from '../dto/create-product.dto';
import type { QueryProductsDto } from '../dto/query-products.dto';
import type { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  type MockProductModel = jest.Mock & {
    find: jest.Mock;
    findOne: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    findByIdAndDelete: jest.Mock;
    create: jest.Mock;
  };

  let mockProductModel: MockProductModel;

  const mockProduct = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Product',
    description: 'Test Description',
    image: 'https://example.com/image.jpg',
    category: ProductCategory.ELECTRONICS,
    price: 99.99,
    availability: true,
    slug: 'test-product',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const mockConstructor = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockProduct),
    })) as unknown as MockProductModel;

    mockConstructor.find = jest.fn();
    mockConstructor.findOne = jest.fn();
    mockConstructor.findByIdAndUpdate = jest.fn();
    mockConstructor.findByIdAndDelete = jest.fn();
    mockConstructor.create = jest.fn();

    mockProductModel = mockConstructor as unknown as MockProductModel;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------------------
  // CREATE
  // ---------------------------
  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = {
        title: 'New Product',
        description: 'New Description',
        image: 'https://example.com/new-image.jpg',
        category: ProductCategory.ELECTRONICS,
        price: 149.99,
        availability: true,
      };

      const expectedResult = { ...mockProduct, ...createProductDto, slug: 'new-product' };

      const mockSave = jest.fn().mockResolvedValue(expectedResult);

      (mockProductModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      const result = await service.create(createProductDto);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  // ---------------------------
  // FIND ALL
  // ---------------------------
  describe('findAll', () => {
    it('should return an array of products', async () => {
      const query: QueryProductsDto = {
        category: ProductCategory.ELECTRONICS,
        sort: SortOrder.PRICE_ASC,
      };

      const mockExec = jest.fn().mockResolvedValue([mockProduct]);
      const mockSort = jest.fn().mockReturnValue({ exec: mockExec });

      mockProductModel.find.mockReturnValue({ sort: mockSort });

      const result = await service.findAll(query);

      expect(mockProductModel.find).toHaveBeenCalled();
      expect(mockSort).toHaveBeenCalled();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  // ---------------------------
  // FIND BY SLUG
  // ---------------------------
  describe('findBySlug', () => {
    it('should return a product when found', async () => {
      const slug = 'test-product';
      const mockExec = jest.fn().mockResolvedValue(mockProduct);

      mockProductModel.findOne.mockReturnValue({ exec: mockExec });

      const result = await service.findBySlug(slug);

      expect(mockProductModel.findOne).toHaveBeenCalledWith({ slug });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      const slug = 'missing';
      const mockExec = jest.fn().mockResolvedValue(null);

      mockProductModel.findOne.mockReturnValue({ exec: mockExec });

      await expect(service.findBySlug(slug)).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------
  // UPDATE
  // ---------------------------
  describe('update', () => {
    it('should update a product successfully', async () => {
      const id = '507f1f77bcf86cd799439011';
      const updateProductDto: UpdateProductDto = { title: 'Updated', price: 200 };
      const updatedProduct = { ...mockProduct, ...updateProductDto };

      const mockExec = jest.fn().mockResolvedValue(updatedProduct);
      mockProductModel.findByIdAndUpdate.mockReturnValue({ exec: mockExec });

      const result = await service.update(id, updateProductDto);

      expect(mockProductModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateProductDto, {
        new: true,
      });
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      const id = 'nonexistent';
      const mockExec = jest.fn().mockResolvedValue(null);
      mockProductModel.findByIdAndUpdate.mockReturnValue({ exec: mockExec });

      await expect(service.update(id, {})).rejects.toThrow(NotFoundException);
    });
  });

  // ---------------------------
  // REMOVE
  // ---------------------------
  describe('remove', () => {
    it('should remove a product successfully', async () => {
      const id = '507f1f77bcf86cd799439011';
      const mockExec = jest.fn().mockResolvedValue(mockProduct);

      mockProductModel.findByIdAndDelete.mockReturnValue({ exec: mockExec });

      await service.remove(id);

      expect(mockProductModel.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(mockExec).toHaveBeenCalled();
    });

    it('should throw NotFoundException when product not found', async () => {
      const id = 'nonexistent';
      const mockExec = jest.fn().mockResolvedValue(null);

      mockProductModel.findByIdAndDelete.mockReturnValue({ exec: mockExec });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
