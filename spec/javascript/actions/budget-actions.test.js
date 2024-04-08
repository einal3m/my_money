import { fromJS } from "immutable";
import * as budgetActions from "actions/budget-actions";
import {
  GET_BUDGETS,
  SET_BUDGETS,
  SAVE_BUDGET,
  DELETE_BUDGET,
} from "actions/action-types";
import * as budgetTransformer from "transformers/budget-transformer";
import store from "stores/store";
import apiUtil from "util/api-util";

describe("BudgetActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchBudgets", () => {
    beforeEach(() => {});

    it("makes an ajax request to GET patterns and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
        Promise.resolve();
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));

      budgetActions.fetchBudgets();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_BUDGETS });
      expect(getArgs.url).toEqual("accounts/12/budgets");

      jest
        .spyOn(budgetTransformer, "transformFromApi")
        .mockImplementation(() => "transformedBudget");

      getArgs.onSuccess({ budgets: ["budget"] });

      expect(budgetTransformer.transformFromApi).toHaveBeenCalledWith("budget");
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_BUDGETS,
        budgets: ["transformedBudget"],
      });
    });
  });

  describe("saveBudget", () => {
    beforeEach(() => {
      jest.spyOn(apiUtil, "post").mockImplementation(() => Promise.resolve());
      jest.spyOn(apiUtil, "put").mockImplementation(() => Promise.resolve());
      jest
        .spyOn(budgetTransformer, "transformToApi")
        .mockImplementation(() => "transformedBudget");
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));
    });

    it("makes a post request if it has no id", () => {
      budgetActions.saveBudget({ description: "my description" });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_BUDGET });
      expect(apiUtil.post).toHaveBeenCalledWith({
        url: "accounts/12/budgets",
        body: { budget: "transformedBudget" },
        onSuccess: budgetActions.fetchBudgets,
      });
      expect(budgetTransformer.transformToApi).toHaveBeenCalledWith({
        description: "my description",
      });
    });

    it("makes a put request if it has an id", () => {
      budgetActions.saveBudget({ id: 1, description: "my description" });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_BUDGET });
      expect(apiUtil.put).toHaveBeenCalledWith({
        url: "accounts/12/budgets/1",
        body: { budget: "transformedBudget" },
        onSuccess: budgetActions.fetchBudgets,
      });
      expect(budgetTransformer.transformToApi).toHaveBeenCalledWith({
        id: 1,
        description: "my description",
      });
    });
  });

  describe("deleteBudget", () => {
    it("makes a delete request", () => {
      jest.spyOn(apiUtil, "delete").mockImplementation(() => Promise.resolve());
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));

      budgetActions.deleteBudget({ id: 1, description: "my description" });

      expect(store.dispatch).toHaveBeenCalledWith({ type: DELETE_BUDGET });
      expect(apiUtil.delete).toHaveBeenCalledWith({
        url: "accounts/12/budgets/1",
        onSuccess: budgetActions.fetchBudgets,
      });
    });
  });
});
