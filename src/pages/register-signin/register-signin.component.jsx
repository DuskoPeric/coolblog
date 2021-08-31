import React from "react";

import "./register-signin.style.scss";

import SignIn from "../../components/signin/signin.component";
import Register from "../../components/register/register.component";

const SignInPage = () => {
  return (
    <div className="container flex login-holder">
      <SignIn />
      <Register />
    </div>
  );
};

export default SignInPage;
