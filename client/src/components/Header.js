import React from "react";

function Header(props) {
  const styles = {
    background: props.url
  };

  return <div className="header" style={styles}>
      <h1>{props.header}</h1>
      <p className="subheader">{props.subheader}</p>
  </div>;
}

export default Header;
