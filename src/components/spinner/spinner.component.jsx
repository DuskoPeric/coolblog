import React from "react";

import "./spinner.style.scss";

const Spinner = Wrapped => props => {
  const { isLoaded, ...otp } = props;
  return isLoaded ? (
    <Wrapped {...otp} />
  ) : (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
};

export default Spinner;
