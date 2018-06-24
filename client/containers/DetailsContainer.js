import { connect } from "react-redux";
import Details from "../components/Details";
import { changeStoreData } from "../actions/actions";

const mapStateToProps = state => {
  console.log(state.get("vipcode"));
  return {
    vipcode: state.get("vipcode")
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(Details);

export default DetailsContainer;
