
const patternTransformer = {
  transformFromApi(pattern) {
    return {
      id: pattern.id,
      accountId: pattern.account_id,
      matchText: pattern.match_text,
      notes: pattern.notes,
      categoryId: pattern.category_id,
      subcategoryId: pattern.subcategory_id,
    };
  },

  transformToApi(pattern) {
    return {
      id: pattern.id,
      account_id: pattern.accountId,
      match_text: pattern.matchText,
      notes: pattern.notes,
      category_id: pattern.categoryId,
      subcategory_id: pattern.subcategoryId,
    };
  },
};

export default patternTransformer;
