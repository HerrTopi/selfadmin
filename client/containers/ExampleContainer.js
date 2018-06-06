import { connect } from "react-redux";
import Example from "../components/Example";
import { changeStoreData } from "../actions/actions";

const mapStateToProps = state => {
  console.log(state.get("storeData"));
  return {
    storeData: state.get("storeData")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStoreData: data => {
      dispatch(changeStoreData(data));
    }
  };
};

const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(Example);

export default ExampleContainer;
