import React, { useState } from "react";

import "./register-signin.style.scss";

import SignIn from "../../components/signin/signin.component";
import Register from "../../components/register/register.component";
import Button from "../../components/button/button.component";
import Graphic from "../../components/graphic/graphic.component";

const SignInPage = () => {
  const [register, setRegister] = useState(false)
  return (
    <div className="container flex login-holder">
      <div className={`signin-card ${!register ? "" : "darker"}`}>
        <div className={`left-card-content ${!register ? "" : "hidde-content"}`}>
          <h3>Create Account</h3>
          <Button onClick={() => { setRegister(true) }} additionalClasses="slide-btn">Sign Up</Button>
        </div>
        <Graphic/>
        <Graphic additionalClasses="reverse"/>
        <div className="sea"></div>
        <div className={`right-card-content ${register ? "" : "hidde-content"}`}>
          <h3>Have an Account?</h3>
          <Button onClick={() => { setRegister(false) }} additionalClasses="slide-btn">Sign in</Button>
        </div>
        <div className={`action-holder ${register ? "" : "register-block"}`}>
          {register ? <Register /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
