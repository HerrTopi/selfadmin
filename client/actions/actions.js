import { EXAMPLE_ACTION } from "./actionList";

export const changeStoreData = data => {
  return {
    type: EXAMPLE_ACTION,
    data
  };
};
