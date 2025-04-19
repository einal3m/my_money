import categoryTransformer from 'transformers/categoryTransformer'
import subcategoryTransformer from 'transformers/subcategoryTransformer'
import {
  Category,
  Subcategory,
  CategoryType,
  CategoryFormInput,
  SubcategoryFormInput,
} from 'types/models'
import { CategoryResponse, SubcategoryResponse } from 'types/api'
import { applicationApi } from './applicationApi'
import { setStatus, ApiStatus, setStatusAndMessage } from './apiStatusSlice'

type ErrorResponse = {
  status: number
  data: { message: string }
}

type Error = {
  error: ErrorResponse
}

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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setStatus({ status: ApiStatus.LOADING }))
        try {
          const { data } = await queryFulfilled
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.DONE,
              message: 'Category saved',
            }),
          )
        } catch (err) {
          const error = err as Error
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.ERROR,
              message: `Error: ${error?.error?.data?.message}`,
            }),
          )
        }
      },
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories', 'category-report', 'subcategory-report'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setStatus({ status: ApiStatus.LOADING }))
        try {
          const { data } = await queryFulfilled
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.DONE,
              message: 'Category deleted',
            }),
          )
        } catch (err) {
          const error = err as Error
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.ERROR,
              message: `Error: ${error?.error?.data?.message}`,
            }),
          )
        }
      },
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
      invalidatesTags: [
        'subcategories',
        'category-report',
        'subcategory-report',
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setStatus({ status: ApiStatus.LOADING }))
        try {
          const { data } = await queryFulfilled
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.DONE,
              message: 'Subcategory saved',
            }),
          )
        } catch (err) {
          const error = err as Error
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.ERROR,
              message: `Error: ${error?.error?.data?.message}`,
            }),
          )
        }
      },
    }),
    deleteSubcategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/subcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'subcategories',
        'category-report',
        'subcategory-report',
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setStatus({ status: ApiStatus.LOADING }))
        try {
          const { data } = await queryFulfilled
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.DONE,
              message: 'Subcategory deleted',
            }),
          )
        } catch (err) {
          const error = err as Error
          dispatch(
            setStatusAndMessage({
              status: ApiStatus.ERROR,
              message: `Error: ${error?.error?.data?.message}`,
            }),
          )
        }
      },
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
