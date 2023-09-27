import store from "../stores/store";
import { SET_API_ERROR, CLEAR_API_ERROR } from "../actions/action-types";

export class ApiStatusActions {
  storeApiError = (message) => {
    store.dispatch({ type: SET_API_ERROR, message });
  };

  clearApiError = () => {
    store.dispatch({ type: CLEAR_API_ERROR });
  };
}

export default new ApiStatusActions();
