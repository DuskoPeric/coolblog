import React from "react";

import "./checkbox.style.scss";

const Checkbox = ({ text, changeEvent, ...otp }) => {
  return (
    <div className="custom-checkbox">
      <input type="checkbox" {...otp} onChange={changeEvent} /> {text}
    </div>
  );
};

export default Checkbox;
