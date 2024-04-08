import { fromJS } from "immutable";
import * as dateRangeActions from "actions/date-range-actions";
import apiUtil from "util/api-util";
import store from "stores/store";
import dateRangeTransformer from "transformers/date-range-transformer";
import {
  GET_DATE_RANGES,
  SET_DATE_RANGES,
  SET_CURRENT_DATE_RANGE,
  UPDATE_CURRENT_DATE_RANGE,
} from "actions/action-types";

describe("DateRangeActions", () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jest.spyOn(store, "dispatch").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get date range options", () => {
    it("getDateRanges calls the date range option api", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation((args) => {
        getArgs = args;
      });
      jest.spyOn(store, "getState").mockImplementation(() => ({
        dateRangeStore: fromJS({ loaded: false }),
      }));

      dateRangeActions.getDateRanges();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_DATE_RANGES });
      expect(getArgs.url).toEqual("date_range_options");

      jest
        .spyOn(dateRangeTransformer, "transformDateRange")
        .mockImplementation(() => "dateRange");

      const successCallback = getArgs.onSuccess;
      successCallback({ date_range_options: ["date_range"] });

      expect(dateRangeTransformer.transformDateRange).toHaveBeenCalledWith(
        "date_range"
      );
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_DATE_RANGES,
        dateRanges: ["dateRange"],
      });
    });

    it("doesnt call the api if date ranges are already loaded", () => {
      let getArgs;
      jest.spyOn(apiUtil, "get").mockImplementation(() => {});
      jest
        .spyOn(store, "getState")
        .mockImplementation(() => ({
          dateRangeStore: fromJS({ loaded: true }),
        }));

      const promise = dateRangeActions.getDateRanges();

      expect(apiUtil.get).not.toHaveBeenCalled();
      expect(promise.then).toBeDefined();
    });
  });

  it("setCurrentDateRange dispatches the id to the store", () => {
    dateRangeActions.setCurrentDateRange(45);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: SET_CURRENT_DATE_RANGE,
      id: 45,
    });
  });

  it("updateCurrentDateRange dispatches the data to the store", () => {
    dateRangeActions.updateCurrentDateRange({ fromDate: "2015-12-19" });
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: UPDATE_CURRENT_DATE_RANGE,
      dateChange: { fromDate: "2015-12-19" },
    });
  });
});
