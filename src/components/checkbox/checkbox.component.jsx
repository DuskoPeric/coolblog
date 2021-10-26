import React from "react";

import "./checkbox.style.scss";

const Checkbox = ({ text, changeEvent, ...otp }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" {...otp} onChange={changeEvent} className="checkbox-input"/> 
      <span className="checkbox">
      <span className="material-icons checkbox-tick">
      done
      </span>
      </span>{text}
    </label>

  );
};

export default Checkbox;
