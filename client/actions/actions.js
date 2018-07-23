import { EXAMPLE_ACTION } from "./actionList";
import { USER_DETAILS } from "./actionList";

export const changeStoreData = (data) => {
  return {
    type: EXAMPLE_ACTION,
    data
  };
};
export const userDetails = (vipcode) => {
  return {
    type: USER_DETAILS,
    vipcode
  };
};
