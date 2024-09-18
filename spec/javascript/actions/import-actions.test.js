import { fromJS } from "immutable";
import * as importActions from "actions/import-actions";
import * as transactionTransformer from "transformers/transactionTransformer";
import apiUtil from "util/api-util";
import store from "stores/store";
import * as routingActions from "actions/routing-actions";
import {
  UPLOAD_OFX,
  SET_OFX_TRANSACTIONS,
  SAVE_TRANSACTIONS,
  SET_NOTES,
  SET_CATEGORY_ID,
  SET_SUBCATEGORY_ID,
  SET_IMPORT,
} from "actions/action-types";

describe("ImportActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("uploadOFX", () => {
    const file = { name: "file.ofx" };
    let uploadArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "upload").mockImplementation((args) => {
        uploadArgs = args;
      });
      jest
        .spyOn(routingActions, "routeToImportTransactions")
        .mockImplementation(() => {});
    });

    it("calls the ofx api with the file and accountId", () => {
      importActions.uploadOFX(45, file);

      expect(apiUtil.upload).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: UPLOAD_OFX,
        fileName: "file.ofx",
      });

      expect(uploadArgs.url).toEqual("accounts/45/transactions/import");
      expect(uploadArgs.file).toEqual(file);
    });

    it("success callback dispatches transactions to the store", () => {
      importActions.uploadOFX(45, file);

      jest
        .spyOn(transactionTransformer, "transformFromOfxApi")
        .mockImplementation(() => "transformedFromApi");

      uploadArgs.onSuccess({ imported_transactions: ["transaction"] });

      expect(transactionTransformer.transformFromOfxApi).toHaveBeenCalledWith(
        "transaction"
      );
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_OFX_TRANSACTIONS,
        transactions: ["transformedFromApi"],
      });
    });
  });

  describe("import transactions", () => {
    let postArgs;
    beforeEach(() => {
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        importStore: fromJS({
          transactions: [
            { memo: "one", import: false },
            { memo: "two", import: true },
          ],
          fileName: "file.ofx",
        }),
        accountStore: fromJS({ currentAccount: { id: 45 } }),
      }));
      jest
        .spyOn(transactionTransformer, "transformToApi")
        .mockImplementation(() => "transaction");
    });

    it("calls the bank statement api to upload the transactions", () => {
      importActions.importTransactions();

      expect(apiUtil.post).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_TRANSACTIONS });
      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith({
        memo: "two",
        import: true,
      });

      expect(postArgs.url).toEqual("accounts/45/bank_statements");
      expect(postArgs.body.account_id).toEqual(45);
      expect(postArgs.body.transactions).toEqual(["transaction"]);
      expect(postArgs.body.file_name).toEqual("file.ofx");
    });

    it("success callback dispatches an empty array to store", () => {
      jest
        .spyOn(routingActions, "routeToTransactions")
        .mockImplementation(() => {});

      importActions.importTransactions();

      postArgs.onSuccess();

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_OFX_TRANSACTIONS,
        transactions: [],
      });
    });
  });

  describe("updating ofx transactions", () => {
    it("setNotes dispatches note to the store", () => {
      importActions.setNotes(3, "newNote");

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_NOTES,
        index: 3,
        notes: "newNote",
      });
    });

    it("setCategoryId dispatches category id to the store", () => {
      importActions.setCategoryId(4, 34);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CATEGORY_ID,
        index: 4,
        categoryId: 34,
      });
    });

    it("setSubcategoryId dispatches subcategory id to the store", () => {
      importActions.setSubcategoryId(5, 27);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_SUBCATEGORY_ID,
        index: 5,
        subcategoryId: 27,
      });
    });

    it("setImport dispatches import flag to the store", () => {
      importActions.setImport(6, true);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_IMPORT,
        index: 6,
        import: true,
      });
    });
  });
});
