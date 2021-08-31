import React from "react";
import "./input.style.scss";

const Input = ({ additionalClasses, changeEvent, changeBlur, ...otp }) => {
  return (
    <div>
      <input
        className={`${additionalClasses} custom-input`}
        {...otp}
        onChange={changeEvent}
        onBlur={changeBlur}
      />
    </div>
  );
};

export default Input;
