import apiStatusActions from "actions/api-status-actions";
import store from "stores/store";
import { SET_API_ERROR, CLEAR_API_ERROR } from "actions/action-types";

describe("ApiStatusActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("storeApiError", () => {
    it("dispatches the error message to the store", () => {
      apiStatusActions.storeApiError("myMessage");
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_API_ERROR,
        message: "myMessage",
      });
    });
  });

  describe("clearApiError", () => {
    it("dispatches the action to the store", () => {
      apiStatusActions.clearApiError();
      expect(dispatcherSpy).toHaveBeenCalledWith({ type: CLEAR_API_ERROR });
    });
  });
});
