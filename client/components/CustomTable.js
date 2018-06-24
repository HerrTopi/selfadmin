import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toJS, fromJS } from "immutable";
import Pagination from "react-js-pagination";

class CustomTable extends Component {
  constructor(props) {
    super(props);

    var visibility = this.props.keys.toJS().reduce((prev, curr) => {
      if (this.props.visibilitySettings) {
        if (this.props.visibilitySettings[curr]) {
          prev[curr] = this.props.visibilitySettings[curr];
        } else {
          prev[curr] = false;
        }
      } else {
        prev[curr] = true;
      }
      return prev;
    }, {});
    this.state = {
      selected: -1,
      content: fromJS([]),
      filteredContent: fromJS([]),
      showFound: true,
      showPaired: true,
      showStatused: true,
      sortedBy: "",
      sortType: "ASC",
      currentPage: 1,
      rowPerPage: 10,
      maxPage: this.props.content.size,
      visibility: visibility,
      visibilitySettings: false,
    };
    this.filters = {};
    this.editedRow = {};
  }
  init() {
    this.filters = this.props.header.toJS();
    for (var key in this.filters) {
      this.filters[key] = "";
    }
    this.filter(this.props);
  }
  componentDidMount() {
    this.init()
  }
  getRowById(id) {
    var returnIt = null;
    this.props.content.forEach((val, ind) => {
      if (val.get("id") == id) {
        returnIt = val;
      }
    });
    return returnIt;
  }
  selectedRow() {
    var response = { selected: -1, pair: -1, status: -1 };
    if (this.state.selected != -1) {
      var row = this.getRowById(this.state.selected);
      response.selected = this.state.selected;
      response.pair = row.get("pair");
      response.status = row.get("status");
    }
    return response;
  }
  toggleSelection(id) {
    if (!this.state.massStatus) {
      if (this.props.selectable || this.props.selectable === undefined) {
        if (this.state.selected == id) {
          this.setState({ selected: -1 });
        } else {
          this.setState({ selected: id });
        }
      }
    } else {
      var massStatusList = this.state.massStatusList;
      if (this.state.massStatusList.indexOf(id) < 0) {
        massStatusList.push(id);
      } else {
        massStatusList.splice(this.state.massStatusList.indexOf(id), 1);
      }
      this.setState({ massStatusList, massStatusList });
    }
  }
  typing(e, id) {
    this.filters[id] = e.target.value;
    this.filter(this.props);
  }
  filter(props) {
    var filteredContent = props.content.filter((val, ind) => {
      let match = true;
      props.keys.forEach((val2, ind2) => {
        if (!val.get(val2) && Boolean(this.filters[val2].toLowerCase())) {
          match = false;
        }
        else if (typeof val.get(val2) !== "string") {
          match = false;
        }
        else if (!val.get(val2) && val.get(val2) !== "") {
          match = false;
        }
        else if (
          val.get(val2).toLowerCase() &&
          !val
            .get(val2)
            .toLowerCase()
            .includes(this.filters[val2].toLowerCase())
        ) {
          match = false;
        }
      });
      return match;
    });
    this.setState({ maxPage: filteredContent.size });
    this.setState({
      content: filteredContent.slice(
        (this.state.currentPage - 1) * this.state.rowPerPage,
        this.state.currentPage * this.state.rowPerPage
      )
    });
    this.setState({ filteredContent });
  }
  sorter(column) {
    if (this.state.sortedBy == column) {
      if (this.state.sortType == "ASC") {
        this.setState({ sortType: "DESC" });
        this.setState({
          content: this.state.content.sort((a, b) => {
            if (a.get(column) < b.get(column)) return 1;
            if (a.get(column) > b.get(column)) return -1;
            return 0;
          })
        });
      } else {
        this.setState({ sortType: "ASC" });
        this.setState({
          content: this.state.content.sort((a, b) => {
            if (a.get(column) < b.get(column)) return -1;
            if (a.get(column) > b.get(column)) return 1;
            return 0;
          })
        });
      }
    } else {
      this.setState({ sortedBy: column });
      this.setState({ sortType: "ASC" });
      this.setState({
        content: this.state.content.sort((a, b) => {
          if (a.get(column) < b.get(column)) return -1;
          if (a.get(column) > b.get(column)) return 1;
          return 0;
        })
      });
    }
  }
  pagination(page) {
    this.setState({ currentPage: page }, _ => {
      this.filter(this.props);
    });
  }
  toggleChange(col) {
    var visibility = this.state.visibility;
    visibility[col] = !visibility[col];
    this.setState({
      visibility: visibility
    });
  }
  toggeVisibilitySettings() {
    this.setState({ visibilitySettings: !this.state.visibilitySettings });
  }
  navToDetails(vipcode) {
    console.log(this.props.navToDetails())
    this.props.userDetails(vipcode);
    this.props.navToDetails(vipcode);
  }

  render() {
    console.log(this.props)
    return (
      <div className="container-fluid">
        <div className="container-fluid">
        </div>
        <div className="container-fluid">
          {this.state.visibilitySettings && (
            <div className="row">
              <hr />
              {this.props.keys.map((val, ind) => {
                return (
                  <label key={ind} className="col-xs-3">
                    <input
                      type="checkbox"
                      checked={this.state.visibility[val]}
                      onChange={_ => this.toggleChange(val)}
                    />
                    {this.props.header.get(val)}
                  </label>
                );
              })}
            </div>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              {this.props.mutatable && <th>Beáll.</th>}
              {this.props.keys.map((val, ind) => {
                if (!this.state.visibility[val]) {
                  return null;
                }
                return (
                  <th
                    onClick={_ => {
                      this.sorter(val);
                    }}
                    key={ind}>
                    {this.props.header.get(val)}
                  </th>
                );
              })}
            </tr>
            <tr>
              {this.props.mutatable && <th />}

              {this.props.keys.map((val, ind) => {
                if (!this.state.visibility[val]) {
                  return null;
                }
                return (
                  <th key={ind}>
                    <input
                      type="text"
                      onChange={e => {
                        this.typing(e, val);
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.content.map((row, rowInd) => {
              return (
                <tr
                  key={rowInd}>
                  {this.props.keys.map((col, colInd) => {
                    if (col === "details") {
                      return <td key={colInd} onClick={_ => {
                        this.navToDetails(row.get(col))
                      }}> D  </td>;
                    }
                    return <td key={colInd}>{row.get(col)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          prevPageText="Előző"
          nextPageText="Következő"
          firstPageText="Első"
          lastPageText="Utolsó"
          activePage={this.state.currentPage}
          itemsCountPerPage={this.state.rowPerPage}
          totalItemsCount={this.state.maxPage}
          onChange={page => this.pagination(page)}
        />
      </div>
    );
  }
}
export default CustomTable;
