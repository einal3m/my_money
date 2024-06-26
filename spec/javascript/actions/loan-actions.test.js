import { fromJS, get } from "immutable";
import * as loanActions from "actions/loan-actions";
import apiUtil from "util/api-util";
import store from "stores/store";
import {
  GET_REPORT,
  SET_LOAN_REPORT,
  SET_LOAN_VIEW,
} from "actions/action-types";

describe("LoanActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchLoanReport", () => {
    let getArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 22 } }),
      }));
    });

    it("calls the loan report api", () => {
      loanActions.fetchLoanReport();

      expect(dispatcherSpy).toHaveBeenCalledWith({ type: GET_REPORT });
      expect(getArgs.url).toEqual("report/home_loan?account_id=22");
    });

    it("saves the report data to the store on success", () => {
      loanActions.fetchLoanReport();

      getArgs.onSuccess({ minimum_repayment: 3456 });

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_LOAN_REPORT,
        report: { minimum_repayment: 3456 },
      });
    });
  });

  describe("setLoanView", () => {
    it("dispatches the action to the store", () => {
      loanActions.setLoanView("chart");

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_LOAN_VIEW,
        view: "chart",
      });
    });
  });
});
