import { fromJS } from "immutable";
import * as matchingTransactionsActions from "actions/matching-transactions-actions";
import apiUtil from "util/api-util";
import store from "stores/store";
import * as transactionTransformer from "transformers/transactionTransformer";
import {
  GET_MATCHING_TRANSACTIONS,
  SET_MATCHING_TRANSACTIONS,
} from "actions/action-types";

describe("MatchingTransactionsActions", () => {
  let dispatcherSpy;
  let getArgs;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
    jest.spyOn(apiUtil, "get").mockImplementation((args) => {
      getArgs = args;
    });
    jest.spyOn(store, "getState").mockImplementation(() => ({
      accountStore: fromJS({ currentAccount: { id: 12 } }),
    }));

    matchingTransactionsActions.getMatchingTransactions(34);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMatchingTransactions", () => {
    it("calls the matching api", () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: GET_MATCHING_TRANSACTIONS,
      });
      expect(getArgs.url).toEqual("accounts/12/transactions/34/matching");
    });

    it("stores the transactions on success", () => {
      jest
        .spyOn(transactionTransformer, "transformFromApi")
        .mockImplementation(() => "transformedTransaction");

      getArgs.onSuccess({ transactions: ["transaction"] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith(
        "transaction"
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_MATCHING_TRANSACTIONS,
        transactions: ["transformedTransaction"],
      });
    });
  });
});
