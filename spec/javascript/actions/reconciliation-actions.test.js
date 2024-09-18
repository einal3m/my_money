import { fromJS } from "immutable";
import * as reconciliationActions from "actions/reconciliation-actions";
import * as reconciliationTransformer from "transformers/reconciliationTransformer";
import store from "stores/store";
import apiUtil from "util/api-util";
import {
  GET_RECONCILIATIONS,
  SET_RECONCILIATIONS,
  SAVE_RECONCILIATION,
} from "actions/action-types";

describe("ReconciliationActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchReconciliations", () => {
    let getArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));

      reconciliationActions.fetchReconciliations();
    });

    it("makes an ajax request to GET reconcilations for current account", () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: GET_RECONCILIATIONS,
      });
      expect(getArgs.url).toEqual("accounts/12/reconciliations");
    });

    it("makes an ajax request to GET reconcilations for current account", () => {
      jest
        .spyOn(reconciliationTransformer, "transformFromApi")
        .mockImplementation(() => "transformedReconciliation");

      const successCallback = getArgs.onSuccess;
      successCallback({ reconciliations: ["reconciliation"] });

      expect(reconciliationTransformer.transformFromApi).toHaveBeenCalledWith(
        "reconciliation"
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_RECONCILIATIONS,
        reconciliations: ["transformedReconciliation"],
      });
    });
  });

  describe("saveReconciliation", () => {
    let postArgs;
    let putArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
        return Promise.resolve();
      });
      jest.spyOn(apiUtil, "put").mockImplementation((args) => {
        putArgs = args;
        return Promise.resolve();
      });
      jest
        .spyOn(reconciliationTransformer, "transformToApi")
        .mockImplementation(() => "transformedReconciliation");
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));
    });

    it("makes a post request if it has no id", () => {
      reconciliationActions.saveReconciliation({ statementBalance: 3000 });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SAVE_RECONCILIATION,
      });
      expect(apiUtil.post).toHaveBeenCalled();
      expect(reconciliationTransformer.transformToApi).toHaveBeenCalledWith({
        statementBalance: 3000,
      });
      expect(postArgs.url).toEqual("accounts/12/reconciliations");
      expect(postArgs.body).toEqual({
        reconciliation: "transformedReconciliation",
      });
    });

    it("makes a put request if it has an id", () => {
      reconciliationActions.saveReconciliation({
        id: 1,
        statementBalance: 3000,
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SAVE_RECONCILIATION,
      });
      expect(apiUtil.put).toHaveBeenCalled();
      expect(reconciliationTransformer.transformToApi).toHaveBeenCalledWith({
        id: 1,
        statementBalance: 3000,
      });

      expect(putArgs.url).toEqual("accounts/12/reconciliations/1");
      expect(putArgs.body).toEqual({
        reconciliation: "transformedReconciliation",
      });
    });
  });
});
