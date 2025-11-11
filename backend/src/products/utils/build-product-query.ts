import { SortOrder } from '../enums';

import type { QueryProductsDto } from '../dto/query-products.dto';
import type { Product } from '../schemas/product.schema';
import type { FilterQuery, SortOrder as MongooseSortOrder } from 'mongoose';

export interface BuildQueryResult {
  filter: FilterQuery<Product>;
  sortOption?: Record<string, MongooseSortOrder>;
}

export const buildProductQuery = (query: QueryProductsDto): BuildQueryResult => {
  const { search, category, minPrice, maxPrice, sort } = query;

  const filter: FilterQuery<Product> = {};

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  let sortOption: Record<string, MongooseSortOrder> | undefined;

  switch (sort) {
    case SortOrder.PRICE_ASC:
      sortOption = { price: 1 };
      break;
    case SortOrder.PRICE_DESC:
      sortOption = { price: -1 };
      break;
    default:
      sortOption = undefined;
  }

  return { filter, sortOption };
};
