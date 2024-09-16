import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import categoryTransformer from '../transformers/category-transformer';
import subcategoryTransformer from '../transformers/subcategory-transformer';

type CategoryType = {
  id: number;
  name: string;
  code: string;
  editable: boolean;
};

type Category = {
  id: number;
  name: string;
  categoryTypeId: number;
};

type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};

type CategoryResponse = {
  id: number;
  name: string;
  category_type_id: number;
};

type SubcategoryResponse = {
  id: number;
  name: string;
  category_id: number;
};

export const categoryApi = createApi({
  reducerPath: 'categoryApiStore',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCategoryTypes: builder.query<CategoryType[], void>({
      query() {
        return {
          url: `/category_type2`,
        };
      },
      transformResponse: (results: { category_type2: CategoryType[] }) =>
        results.category_type2,
    }),
    getCategories: builder.query<Category[], void>({
      query() {
        return {
          url: `/categories`,
        };
      },
      transformResponse: (results: { categories: CategoryResponse[] }) =>
        results.categories.map((category) =>
          categoryTransformer.transformFromApi(category),
        ),
    }),
    getSubcategories: builder.query<Subcategory[], void>({
      query() {
        return {
          url: `/subcategories`,
        };
      },
      transformResponse: (results: { subcategories: SubcategoryResponse[] }) =>
        results.subcategories.map((subcategory) =>
          subcategoryTransformer.transformFromApi(subcategory),
        ),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryTypesQuery, useGetSubcategoriesQuery } = categoryApi;
