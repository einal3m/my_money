import {
  setCurrentCategory,
  setCurrentSubcategory,
  fetchCategoryTypes,
  fetchCategories,
  fetchSubcategories,
} from "actions/category-actions";
import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  SET_CATEGORY_TYPES,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
} from "actions/action-types";
import categoryTransformer from "transformers/categoryTransformer";
import subcategoryTransformer from "transformers/subcategoryTransformer";
import apiUtil from "util/api-util";
import store from "stores/store";

describe("CategoryActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("fetchCategoryTypes", () => {
    it("fetches category types and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });

      fetchCategoryTypes();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(getArgs.url).toEqual("category_type2");

      getArgs.onSuccess({ category_type2: ["types"] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_CATEGORY_TYPES,
        categoryTypes: ["types"],
      });
    });
  });

  describe("fetchCategories", () => {
    it("fetches categories and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });

      fetchCategories();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(getArgs.url).toEqual("categories");

      jest
        .spyOn(categoryTransformer, "transformFromApi")
        .mockImplementation(() => "transformedCategory");

      getArgs.onSuccess({ categories: ["category"] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_CATEGORIES,
        categories: ["transformedCategory"],
      });
      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "category"
      );
    });
  });

  describe("fetchSubcategories", () => {
    it("fetches subcategories and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });

      fetchSubcategories();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(getArgs.url).toEqual("subcategories");

      jest
        .spyOn(subcategoryTransformer, "transformFromApi")
        .mockImplementation(() => "transformedSubcategory");

      getArgs.onSuccess({ subcategories: ["subcategory"] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_SUBCATEGORIES,
        subcategories: ["transformedSubcategory"],
      });
      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "subcategory"
      );
    });
  });

  describe("setCurrentCategory", () => {
    it("dispatches the id to the store", () => {
      setCurrentCategory(11);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CURRENT_CATEGORY,
        categoryId: 11,
      });
    });
  });

  describe("setCurrentSubcategory", () => {
    it("dispatches the id to the store", () => {
      setCurrentSubcategory(13);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CURRENT_SUBCATEGORY,
        subcategoryId: 13,
      });
    });
  });
});
