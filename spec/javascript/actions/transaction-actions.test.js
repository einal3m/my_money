import { Map } from "immutable";
import * as transactionActions from "actions/transaction-actions";
import transactionTransformer from "transformers/transaction-transformer";
import store from "stores/store";
import apiUtil from "util/api-util";
import * as reportActions from "actions/report-actions";
import {
  SET_TRANSACTIONS,
  SET_SEARCH_DESCRIPTION,
  TOGGLE_MORE_OR_LESS,
  SOURCE_CATEGORY_REPORT,
  SOURCE_SUBCATEGORY_REPORT,
} from "actions/action-types";

describe("TransactionActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTransactions", () => {
    let getArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });
    });

    it("makes a get request with data params", () => {
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({
          currentDateRange: Map({
            fromDate: "2016-08-19",
            toDate: "2016-12-19",
          }),
        }),
        transactionStore: Map({ moreOptions: false }),
      }));

      transactionActions.fetchTransactions();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(getArgs.url).toEqual(
        "accounts/4/transactions?from_date=2016-08-19&to_date=2016-12-19"
      );
    });

    it("makes a get request with description, if it is set", () => {
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({
          currentDateRange: Map({
            fromDate: "2016-08-19",
            toDate: "2016-12-19",
          }),
        }),
        transactionStore: Map({
          moreOptions: true,
          searchDescription: "hello",
        }),
      }));

      transactionActions.fetchTransactions();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(getArgs.url).toEqual(
        "accounts/4/transactions?from_date=2016-08-19&to_date=2016-12-19&description=hello"
      );
    });

    it("stores the transaction in the store, on success", () => {
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({
          currentDateRange: Map({
            fromDate: "2016-08-19",
            toDate: "2016-12-19",
          }),
        }),
        transactionStore: Map({ moreOptions: false }),
      }));
      jest
        .spyOn(transactionTransformer, "transformFromApi")
        .mockImplementation(() => "transformedTransaction");

      transactionActions.fetchTransactions();

      getArgs.onSuccess({ transactions: ["transaction"] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith(
        "transaction"
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_TRANSACTIONS,
        transactions: ["transformedTransaction"],
      });
    });
  });

  describe("saveTransaction", () => {
    let postArgs;
    let putArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
      });
      jest.spyOn(apiUtil, "put").mockImplementation((args) => {
        putArgs = args;
      });
    });

    it("makes post request with callback when id is not present", () => {
      const transaction = { notes: "Cat", accountId: 4 };
      jest
        .spyOn(transactionTransformer, "transformToApi")
        .mockImplementation(() => "transformedTransaction");

      transactionActions.saveTransaction(transaction);

      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith(
        transaction
      );
      expect(apiUtil.post).toHaveBeenCalled();
      expect(postArgs.url).toEqual("accounts/4/transactions");
      expect(postArgs.body).toEqual({ transaction: "transformedTransaction" });
    });

    it("makes put request with callback when id is present", () => {
      const transaction = { id: 23, notes: "Cat", accountId: 4 };
      jest
        .spyOn(transactionTransformer, "transformToApi")
        .mockImplementation(() => "transformedTransaction");

      transactionActions.saveTransaction(transaction);

      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith(
        transaction
      );
      expect(apiUtil.put).toHaveBeenCalled();
      expect(putArgs.url).toEqual("accounts/4/transactions/23");
      expect(putArgs.body).toEqual({ transaction: "transformedTransaction" });
    });
  });

  describe("onSuccessCallback", () => {
    it("calls the getCategoryReport action if source is category report", () => {
      jest.spyOn(store, "getState").mockImplementation(() => ({
        formStore: { source: SOURCE_CATEGORY_REPORT },
      }));
      jest
        .spyOn(reportActions, "getCategoryReport")
        .mockImplementation(() => {});

      transactionActions.onSuccess();

      expect(reportActions.getCategoryReport).toHaveBeenCalled();
    });

    it("calls the getSubcategoryReport action if source is subcategory report", () => {
      jest.spyOn(store, "getState").mockImplementation(() => ({
        formStore: { source: SOURCE_SUBCATEGORY_REPORT },
      }));
      jest
        .spyOn(reportActions, "getSubcategoryReport")
        .mockImplementation(() => {});

      transactionActions.onSuccess();

      expect(reportActions.getSubcategoryReport).toHaveBeenCalled();
    });
  });

  describe("deleteTransaction", () => {
    it("makes delete request", () => {
      const transaction = { id: 23, accountId: 4 };
      let deleteArgs;
      jest.spyOn(apiUtil, "delete").mockImplementation((args) => {
        deleteArgs = args;
      });

      transactionActions.deleteTransaction(transaction);

      expect(apiUtil.delete).toHaveBeenCalled();
      expect(deleteArgs.url).toEqual("accounts/4/transactions/23");
    });
  });

  describe("setSearchDescription", () => {
    it("dispatches the description to the store", () => {
      transactionActions.setSearchDescription("my String");
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_SEARCH_DESCRIPTION,
        description: "my String",
      });
    });
  });

  describe("toggleMoreOrLess", () => {
    it("dispatches the toggle actions", () => {
      transactionActions.toggleMoreOrLess();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: TOGGLE_MORE_OR_LESS,
      });
    });
  });
});
