import { EXAMPLE_ACTION } from "../actions/actionList";
import { fromJS, toJS, Map, List } from "immutable";
import { initialState } from "./store";

const reducer = (state = initialState, action) => {
  if (action.type == EXAMPLE_ACTION) {
    return state.set("storeData", fromJS(action.data));
  }

  return state;
};

export default reducer;
