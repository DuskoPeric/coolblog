import React from "react";

import "./button.style.scss";

const Button = ({ children, additionalClasses, ...otp }) => {
  return (
    <button className={`${additionalClasses} custom-btn`} {...otp}>
      {children}
    </button>
  );
};

export default Button;
