import { connect } from "react-redux";
import CustomTable from "../components/CustomTable";
import { changeStoreData } from "../actions/actions";
import { userDetails } from "../actions/actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    userDetails: vipcode => {
      dispatch(userDetails(vipcode));
    }
  };
};

const CustomTableContainter = connect(mapStateToProps, mapDispatchToProps)(CustomTable);

export default CustomTableContainter;
