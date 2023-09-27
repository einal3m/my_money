import { Map, List, fromJS } from "immutable";
import {
  GET_MATCHING_TRANSACTIONS,
  SET_MATCHING_TRANSACTIONS,
} from "../actions/action-types";

const INITIAL_STATE = Map({
  matchingTransactions: List(),
  loading: false,
});

export default function reducer(
  state = INITIAL_STATE,
  action = { type: "NO_ACTION" }
) {
  switch (action.type) {
    case GET_MATCHING_TRANSACTIONS:
      return state.set("loading", true).set("matchingTransactions", List());
    case SET_MATCHING_TRANSACTIONS:
      return state
        .set("loading", false)
        .set("matchingTransactions", fromJS(action.transactions));
    default:
      return state;
  }
}
