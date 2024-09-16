import {
  useGetCategoriesQuery,
  useGetCategoryTypesQuery,
  useGetSubcategoriesQuery,
} from '../../stores/category-slice';

export const useGroupedCategories = () => {
  const {
    data: categories,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
  } = useGetCategoriesQuery();

  const {
    data: categoryTypes,
    isLoading: isLoadingT,
    isSuccess: isSuccessT,
  } = useGetCategoryTypesQuery();

  const {
    data: subcategories,
    isLoading: isLoadingS,
    isSuccess: isSuccessS,
  } = useGetSubcategoriesQuery();

  const isLoading = isLoadingC || isLoadingS || isLoadingT;
  const isSuccess = isSuccessC && isSuccessS && isSuccessT;

  const groupedCategories = categoryTypes
    ?.filter((ct) => ct.editable)
    .map((ct) => ({
      categoryType: ct,
      categories: categories
        ?.filter((c) => c.categoryTypeId == ct.id)
        .map((c) => ({
          ...c,
          subcategories: subcategories?.filter((s) => s.categoryId == c.id),
        })),
    }));

  return { isLoading, isSuccess, groupedCategories };
};
