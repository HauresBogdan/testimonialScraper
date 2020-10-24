import React from "react";

function Footer(props) {
  const styles = {
    background: props.bottomBannerColor
  };

  return (
    <div className="footer" style={styles}>
      <h2>{props.bottomHeader}</h2>
      <p>{props.bottomParagraph}</p>
      <a href={props.actionCallURL}>{props.actionCallText}</a>
    </div>
  );
}

export default Footer;
