import { fromJS } from "immutable";
import * as accountActions from "actions/account-actions";
import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  GET_ACCOUNT_TYPES,
  SET_CURRENT_ACCOUNT,
  SET_ACCOUNT_TYPES,
  SET_SELECTED_ACCOUNTS,
  SAVE_ACCOUNT,
} from "actions/action-types";
import * as accountTransformer from "transformers/accountTransformer";
import store from "stores/store";
import apiUtil from "util/api-util";

describe("AccountActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAccounts", () => {
    // TODO: figure out how to test promises :)
  });

  describe("fetchAccounts", () => {
    it("makes an ajax request to GET/accounts and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
        return Promise.resolve();
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ loaded: false }),
      }));

      const promise = accountActions.fetchAccounts();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_ACCOUNTS });

      expect(getArgs.url).toEqual("accounts");

      jest
        .spyOn(accountTransformer, "transformFromApi")
        .mockImplementation(() => "transformedFromApi");
      const successCallback = getArgs.onSuccess;
      successCallback({ accounts: ["account"] });

      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith(
        "account"
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_ACCOUNTS,
        accounts: ["transformedFromApi"],
      });
    });

    it("doesnt call the api if accounts already loaded and useStoredAccounts is true", () => {
      jest.spyOn(apiUtil, "get");
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ loaded: true }),
      }));

      const promise = accountActions.fetchAccounts({ useStore: true });
      expect(apiUtil.get).not.toHaveBeenCalled();

      expect(promise.then).toBeDefined();
    });

    it("does call the api if already loaded and useStoredAccounts is false", () => {
      jest.spyOn(apiUtil, "get");
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ loaded: true }),
      }));

      accountActions.fetchAccounts();

      expect(apiUtil.get).toHaveBeenCalled();
    });
  });

  describe("getAccountTypes", () => {
    it("makes an ajax request to GET/account_types and calls callback on success", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
        return Promise.resolve();
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ accountTypesLoaded: false }),
      }));

      const promise = accountActions.getAccountTypes();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_ACCOUNT_TYPES });

      expect(getArgs.url).toEqual("account_types");

      const successCallback = getArgs.onSuccess;
      successCallback({ account_types: ["account_type"] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_ACCOUNT_TYPES,
        accountTypes: ["account_type"],
      });
    });

    it("doesnt call the api if account types already loaded", () => {
      jest.spyOn(apiUtil, "get");
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ accountTypesLoaded: true }),
      }));

      const promise = accountActions.getAccountTypes();
      expect(apiUtil.get).not.toHaveBeenCalled();

      expect(promise.then).toBeDefined();
    });
  });

  describe("saveAccount", () => {
    it("calls the api to create the account if id not present", () => {
      jest.spyOn(apiUtil, "post").mockImplementation(() => {});
      jest
        .spyOn(accountTransformer, "transformToApi")
        .mockImplementation(() => "transformedAccount");

      accountActions.saveAccount({ name: "my account" });

      expect(accountTransformer.transformToApi).toHaveBeenCalledWith({
        name: "my account",
      });
      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_ACCOUNT });
      expect(apiUtil.post).toHaveBeenCalledWith({
        url: "accounts",
        body: { account: "transformedAccount" },
        onSuccess: accountActions.getAccounts,
      });
    });

    it("calls the api to update the account if id is present", () => {
      jest.spyOn(apiUtil, "put").mockImplementation(() => {});
      jest
        .spyOn(accountTransformer, "transformToApi")
        .mockImplementation(() => "transformedAccount");

      accountActions.saveAccount({ id: 2, name: "my account" });

      expect(accountTransformer.transformToApi).toHaveBeenCalledWith({
        id: 2,
        name: "my account",
      });
      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_ACCOUNT });
      expect(apiUtil.put).toHaveBeenCalledWith({
        url: "accounts/2",
        body: { account: "transformedAccount" },
        onSuccess: accountActions.getAccounts,
      });
    });
  });

  describe("deleteAccount", () => {
    it("calls the account api to delete the account", () => {
      jest.spyOn(apiUtil, "delete").mockImplementation(() => {});

      accountActions.deleteAccount(34);

      expect(store.dispatch).toHaveBeenCalledWith({ type: "DELETE_ACCOUNT" });
      expect(apiUtil.delete).toHaveBeenCalledWith({
        url: "accounts/34",
        onSuccess: accountActions.getAccounts,
      });
    });
  });

  describe("softDeleteAccount", () => {
    it("calls the account api to deactivate the account", () => {
      jest.spyOn(apiUtil, "post").mockImplementation(() => {});

      accountActions.softDeleteAccount(34);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: "DEACTIVATE_ACCOUNT",
      });
      expect(apiUtil.post).toHaveBeenCalledWith({
        url: "accounts/34/deactivate",
        onSuccess: accountActions.getAccounts,
      });
    });
  });

  describe("account filter actions", () => {
    it("setCurrentAccount dispatches the id to the store", () => {
      accountActions.setCurrentAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CURRENT_ACCOUNT,
        id: 45,
      });
    });

    it("setSelectedAccounts", () => {
      accountActions.setSelectedAccounts([45]);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_SELECTED_ACCOUNTS,
        accountIds: [45],
      });
    });
  });
});
