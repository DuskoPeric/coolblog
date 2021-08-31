import React from "react";

import "./popup.style.scss";

const Popup = props => {
  const { title, closePopup, children } = props;
  return (
    <div className="popup">
      <div className="popup-card">
        <h2>{title}</h2>
        <span onClick={closePopup} className="material-icons">cancel</span>
        {children}
      </div>
    </div>
  );
};

export default Popup;
