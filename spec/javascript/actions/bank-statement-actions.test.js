import { fromJS } from "immutable";
import * as bankStatementActions from "actions/bank-statement-actions";
import {
  GET_BANK_STATEMENTS,
  SET_BANK_STATEMENTS,
  CONFIRM_DELETE_BANK_STATEMENT,
  CANCEL_DELETE_BANK_STATEMENT,
  DELETE_BANK_STATEMENT,
} from "actions/action-types";
import * as bankStatementTransformer from "transformers/bankStatementTransformer";
import apiUtil from "util/api-util";
import store from "stores/store";

describe("BankStatementActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchBankStatements", () => {
    beforeEach(() => {});

    it("calls the bank_statements api", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 22 } }),
      }));
      bankStatementActions.fetchBankStatements();

      expect(dispatcherSpy).toHaveBeenCalledWith({ type: GET_BANK_STATEMENTS });
      expect(getArgs.url).toEqual("accounts/22/bank_statements");

      jest
        .spyOn(bankStatementTransformer, "transformFromApi")
        .mockImplementation(() => "transformedBankStatement");

      getArgs.onSuccess({ bank_statements: ["bankStatement"] });

      expect(bankStatementTransformer.transformFromApi).toHaveBeenCalledWith(
        "bankStatement"
      );
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_BANK_STATEMENTS,
        bankStatements: ["transformedBankStatement"],
      });
    });
  });

  describe("delete modal", () => {
    it("confirmDeleteBankStatement dispatches id to the store", () => {
      bankStatementActions.confirmDeleteBankStatement({ id: 123 });
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: CONFIRM_DELETE_BANK_STATEMENT,
        bankStatement: { id: 123 },
      });
    });

    it("cancelDeleteBankStatement dispatches action to the store", () => {
      bankStatementActions.cancelDeleteBankStatement();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: CANCEL_DELETE_BANK_STATEMENT,
      });
    });
  });

  describe("deleteBankStatement", () => {
    it("makes delete request", () => {
      const bankStatement = { id: 23, accountId: 4 };
      jest.spyOn(apiUtil, "delete").mockImplementation(() => {});

      bankStatementActions.deleteBankStatement(bankStatement);

      expect(apiUtil.delete).toHaveBeenCalledWith({
        url: "accounts/4/bank_statements/23",
        onSuccess: bankStatementActions.fetchBankStatements,
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        type: DELETE_BANK_STATEMENT,
      });
    });
  });
});
