import categoryTransformer from 'transformers/categoryTransformer'
import subcategoryTransformer from 'transformers/subcategoryTransformer'
import { Category, Subcategory, CategoryType, CategoryFormInput, SubcategoryFormInput } from 'types/models'
import { CategoryResponse, SubcategoryResponse } from 'types/api'
import { applicationApi } from './applicationApi'

export const categoryApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryTypes: builder.query<CategoryType[], void>({
      query() {
        return {
          url: `/category_type2`,
        }
      },
      transformResponse: (results: { category_type2: CategoryType[] }) =>
        results.category_type2,
    }),
    getCategories: builder.query<Category[], void>({
      query() {
        return {
          url: `/categories`,
        }
      },
      transformResponse: (results: { categories: CategoryResponse[] }) =>
        results.categories.map((category) =>
          categoryTransformer.transformFromApi(category),
        ),
      providesTags: () => ['categories'],
    }),
    upsertCategory: builder.mutation<void, CategoryFormInput>({
      query: (category) => ({
        url: `/categories${category.id ? '/' + category.id : ''}`,
        method: category.id ? 'PUT' : 'POST',
        body: { category: categoryTransformer.transformToApi(category) },
      }),
      invalidatesTags: ['categories', 'category-report', 'subcategory-report'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories', 'category-report', 'subcategory-report'],
    }),
    getSubcategories: builder.query<Subcategory[], void>({
      query() {
        return {
          url: `/subcategories`,
        }
      },
      transformResponse: (results: { subcategories: SubcategoryResponse[] }) =>
        results.subcategories.map((subcategory) =>
          subcategoryTransformer.transformFromApi(subcategory),
        ),
      providesTags: () => ['subcategories'],
    }),
    upsertSubcategory: builder.mutation<void, SubcategoryFormInput>({
      query: (subcategory) => ({
        url: `/subcategories${subcategory.id ? '/' + subcategory.id : ''}`,
        method: subcategory.id ? 'PUT' : 'POST',
        body: {
          subcategory: subcategoryTransformer.transformToApi(subcategory),
        },
      }),
      invalidatesTags: ['subcategories', 'category-report', 'subcategory-report'],
    }),
    deleteSubcategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/subcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subcategories', 'category-report', 'subcategory-report'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryTypesQuery,
  useGetSubcategoriesQuery,
  useUpsertCategoryMutation,
  useUpsertSubcategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
} = categoryApi
