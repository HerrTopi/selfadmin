import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import AppContainer from "./containers/AppContainer";

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
