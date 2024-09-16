import categoryActions, {
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
  SAVE_CATEGORY,
  DELETE_CATEGORY,
  SAVE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  SET_CATEGORY,
  SET_SUBCATEGORY,
  REMOVE_CATEGORY,
  REMOVE_SUBCATEGORY,
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

  describe("category actions", () => {
    describe("saveCategory", () => {
      it("calls createCategory when no id is present", () => {
        jest
          .spyOn(categoryActions, "createCategory")
          .mockImplementation(() => {});

        categoryActions.saveCategory({ name: "Melanie" });

        expect(categoryActions.createCategory).toHaveBeenCalledWith({
          name: "Melanie",
        });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: SAVE_CATEGORY });
      });

      it("calls updateCategory when id is present", () => {
        jest
          .spyOn(categoryActions, "updateCategory")
          .mockImplementation(() => {});

        categoryActions.saveCategory({ id: 1, name: "Melanie" });

        expect(categoryActions.updateCategory).toHaveBeenCalledWith({
          id: 1,
          name: "Melanie",
        });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: SAVE_CATEGORY });
      });
    });

    it("createCategory calls apiUtil.post with callback", () => {
      let postArgs;
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
      });
      jest
        .spyOn(categoryTransformer, "transformToApi")
        .mockImplementation(() => "transformedCategory");

      categoryActions.createCategory("category");

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith(
        "category"
      );
      expect(apiUtil.post).toHaveBeenCalled();
      expect(postArgs.url).toEqual("categories");

      jest
        .spyOn(categoryTransformer, "transformFromApi")
        .mockImplementation(() => "newCategory");
      jest.spyOn(categoryActions, "storeCategory").mockImplementation(() => {});

      const successCallback = postArgs.onSuccess;
      successCallback({ category: "categoryFromApi" });

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "categoryFromApi"
      );
      expect(categoryActions.storeCategory).toHaveBeenCalledWith("newCategory");
    });

    it("updateCategory calls apiUtil.put with callback", () => {
      const category = { id: 23, name: "Cat" };
      let putArgs;
      jest.spyOn(apiUtil, "put").mockImplementation((args) => {
        putArgs = args;
      });
      jest
        .spyOn(categoryTransformer, "transformToApi")
        .mockImplementation(() => "transformedCategory");

      categoryActions.updateCategory(category);

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith(category);
      expect(apiUtil.put).toHaveBeenCalled();
      expect(putArgs.url).toEqual("categories/23");
      expect(putArgs.body).toEqual({ category: "transformedCategory" });

      jest
        .spyOn(categoryTransformer, "transformFromApi")
        .mockImplementation(() => "updatedCategory");
      jest.spyOn(categoryActions, "storeCategory").mockImplementation(() => {});

      const successCallback = putArgs.onSuccess;
      successCallback({ category: "categoryFromApi" });

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "categoryFromApi"
      );
      expect(categoryActions.storeCategory).toHaveBeenCalledWith(
        "updatedCategory"
      );
    });

    it("deleteCategory calls apiUtil.destroy with callback", () => {
      let deleteArgs;
      jest.spyOn(apiUtil, "delete").mockImplementation((args) => {
        deleteArgs = args;
      });

      categoryActions.deleteCategory(23);

      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({ type: DELETE_CATEGORY });
      expect(deleteArgs.url).toEqual("categories/23");

      jest
        .spyOn(categoryActions, "removeCategory")
        .mockImplementation(() => {});

      const successCallback = deleteArgs.onSuccess;
      successCallback();

      expect(categoryActions.removeCategory).toHaveBeenCalledWith(23);
    });

    it("storeCategory dispatches the category to the store", () => {
      categoryActions.storeCategory("category");
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CATEGORY,
        category: "category",
      });
    });

    it("removeCategory dispatches the category id to the store", () => {
      categoryActions.removeCategory(13);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: REMOVE_CATEGORY,
        categoryId: 13,
      });
    });
  });

  describe("subcategory actions", () => {
    describe("saveSubcategory", () => {
      it("calls createSubcategory when no id is present", () => {
        jest
          .spyOn(categoryActions, "createSubcategory")
          .mockImplementation(() => {});

        categoryActions.saveSubcategory({ name: "Melanie" });

        expect(categoryActions.createSubcategory).toHaveBeenCalledWith({
          name: "Melanie",
        });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: SAVE_SUBCATEGORY });
      });

      it("calls updateSubcategory when id is present", () => {
        jest
          .spyOn(categoryActions, "updateSubcategory")
          .mockImplementation(() => {});

        categoryActions.saveSubcategory({ id: 1, name: "Melanie" });

        expect(categoryActions.updateSubcategory).toHaveBeenCalledWith({
          id: 1,
          name: "Melanie",
        });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: SAVE_SUBCATEGORY });
      });
    });

    it("createSubcategory calls apiUtil.post with callback", () => {
      let postArgs;
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
      });
      jest
        .spyOn(subcategoryTransformer, "transformToApi")
        .mockImplementation(() => "transformedSubcategory");

      categoryActions.createSubcategory("subcategory");

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith(
        "subcategory"
      );
      expect(apiUtil.post).toHaveBeenCalled();
      expect(postArgs.url).toEqual("subcategories");

      jest
        .spyOn(subcategoryTransformer, "transformFromApi")
        .mockImplementation(() => "newSubcategory");
      jest
        .spyOn(categoryActions, "storeSubcategory")
        .mockImplementation(() => {});

      const successCallback = postArgs.onSuccess;
      successCallback({ subcategory: "subcategoryFromApi" });

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "subcategoryFromApi"
      );
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith(
        "newSubcategory"
      );
    });

    it("updateSubcategory calls apiUtil.put with callback", () => {
      const subcategory = { id: 11, name: "Sub" };
      let putArgs;
      jest.spyOn(apiUtil, "put").mockImplementation((args) => {
        putArgs = args;
      });
      jest
        .spyOn(subcategoryTransformer, "transformToApi")
        .mockImplementation(() => "transformedSubcategory");

      categoryActions.updateSubcategory(subcategory);

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith(
        subcategory
      );
      expect(apiUtil.put).toHaveBeenCalled();
      expect(putArgs.url).toEqual("subcategories/11");

      jest
        .spyOn(subcategoryTransformer, "transformFromApi")
        .mockImplementation(() => "updatedSubcategory");
      jest
        .spyOn(categoryActions, "storeSubcategory")
        .mockImplementation(() => {});

      const successCallback = putArgs.onSuccess;
      successCallback({ subcategory: "subcategoryFromApi" });

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith(
        "subcategoryFromApi"
      );
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith(
        "updatedSubcategory"
      );
    });

    it("deleteSubcategory calls apiUtil.delete with callback", () => {
      let deleteArgs;
      jest.spyOn(apiUtil, "delete").mockImplementation((args) => {
        deleteArgs = args;
      });

      categoryActions.deleteSubcategory(43);

      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({ type: DELETE_SUBCATEGORY });
      expect(deleteArgs.url).toEqual("subcategories/43");

      jest
        .spyOn(categoryActions, "removeSubcategory")
        .mockImplementation(() => {});

      const successCallback = deleteArgs.onSuccess;
      successCallback();

      expect(categoryActions.removeSubcategory).toHaveBeenCalledWith(43);
    });

    it("storeSubcategory dispatches the subcategory to the store", () => {
      categoryActions.storeSubcategory("subcategory");
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_SUBCATEGORY,
        subcategory: "subcategory",
      });
    });

    it("removeSubcategory dispatches the subcategory id to the store", () => {
      categoryActions.removeSubcategory(14);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: REMOVE_SUBCATEGORY,
        subcategoryId: 14,
      });
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
