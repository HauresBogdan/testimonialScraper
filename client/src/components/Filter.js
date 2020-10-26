import React from "react";

function Filter(props) {
  if (props.filterLabel) {
    return (
      <div className="filter">
        <p className="filter-label">{props.filterLabel}</p>
      </div>
    );
  } else {
    return (
      <div className="filter">
        <p className="filter-label">Filter by country:</p>
      </div>
    );
  }
}

export default Filter;
