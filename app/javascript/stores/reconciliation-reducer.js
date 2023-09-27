import { Map, List } from "immutable";
import {
  GET_RECONCILIATIONS,
  SET_RECONCILIATIONS,
} from "../actions/action-types";

const INITIAL_STATE = Map({
  loaded: false,
  reconciliations: List([]),
});

export default function reducer(
  state = INITIAL_STATE,
  action = { type: "NO_ACTION" }
) {
  switch (action.type) {
    case GET_RECONCILIATIONS:
      return state.set("loaded", false).set("reconciliations", List());
    case SET_RECONCILIATIONS:
      return state
        .set("loaded", true)
        .set("reconciliations", List(action.reconciliations));
    default:
      return state;
  }
}
