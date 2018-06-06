import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = state => {
  return {
    test: state.get("test")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doMagic: message => {
      dispatch(doMagic(message));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
