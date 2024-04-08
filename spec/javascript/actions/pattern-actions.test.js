import { fromJS } from "immutable";
import * as patternActions from "actions/pattern-actions";
import patternTransformer from "transformers/pattern-transformer";
import store from "stores/store";
import apiUtil from "util/api-util";
import {
  SET_PATTERNS,
  GET_PATTERNS,
  SAVE_PATTERN,
  DELETE_PATTERN,
} from "actions/action-types";

describe("PatternActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPatterns", () => {
    // figure out how to test promises :)
  });

  describe("fetchPatterns", () => {
    it("makes an ajax request to GET patterns and calls callback on success", () => {
      var getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
        return Promise.resolve();
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        accountStore: fromJS({ currentAccount: { id: 12 } }),
      }));

      const promise = patternActions.fetchPatterns();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_PATTERNS });

      expect(getArgs.url).toEqual("accounts/12/patterns");

      jest
        .spyOn(patternTransformer, "transformFromApi")
        .mockImplementation(() => "transformedPattern");

      const successCallback = getArgs.onSuccess;
      successCallback({ patterns: ["pattern"] });

      expect(patternTransformer.transformFromApi).toHaveBeenCalledWith(
        "pattern"
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_PATTERNS,
        patterns: ["transformedPattern"],
      });
    });
  });

  describe("savePattern", () => {
    it("calls the api to create the pattern if id not present", () => {
      const pattern = { accountId: 3, matchText: "my pattern" };
      var postArgs;
      jest.spyOn(apiUtil, "post").mockImplementation((args) => {
        postArgs = args;
      });
      jest
        .spyOn(patternTransformer, "transformToApi")
        .mockImplementation(() => "transformedPattern");

      patternActions.savePattern(pattern);

      expect(apiUtil.post).toHaveBeenCalled();
      expect(patternTransformer.transformToApi).toHaveBeenCalledWith(pattern);
      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_PATTERN });

      expect(postArgs.url).toEqual("accounts/3/patterns");
      expect(postArgs.body).toEqual({ pattern: "transformedPattern" });
      expect(postArgs.onSuccess).toEqual(patternActions.getPatterns);
    });

    it("calls the api to update the pattern if id is present", () => {
      const pattern = { id: 2, accountId: 3, matchText: "my pattern" };
      var putArgs;
      jest.spyOn(apiUtil, "put").mockImplementation((args) => {
        putArgs = args;
      });

      jest
        .spyOn(patternTransformer, "transformToApi")
        .mockImplementation(() => "transformedPattern");

      patternActions.savePattern(pattern);

      expect(apiUtil.put).toHaveBeenCalled();
      expect(patternTransformer.transformToApi).toHaveBeenCalledWith(pattern);
      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_PATTERN });

      expect(putArgs.url).toEqual("accounts/3/patterns/2");
      expect(putArgs.body).toEqual({ pattern: "transformedPattern" });
      expect(putArgs.onSuccess).toEqual(patternActions.getPatterns);
    });
  });

  describe("deletePattern", () => {
    it("calls the pattern api to delete the pattern", () => {
      const pattern = { id: 2, accountId: 3, matchText: "my pattern" };
      var deleteArgs;
      jest.spyOn(apiUtil, "delete").mockImplementation((params) => {
        deleteArgs = params;
      });

      patternActions.deletePattern(pattern);

      expect(apiUtil.delete).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: DELETE_PATTERN });

      expect(deleteArgs.url).toEqual("accounts/3/patterns/2");
      expect(deleteArgs.onSuccess).toEqual(patternActions.getPatterns);
    });
  });
});
