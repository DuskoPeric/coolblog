import React, { useState } from "react";

import "./signin.style.scss";

import { auth } from "../../firebase/firebase.utils";

import Button from "../button/button.component";
import Input from "../input/input.component";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async event => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("error :" + error.message);
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="signin">
      <h2>I already have an account</h2>
      <p className="subtitle">Sign in with your email and password</p>
      <form onSubmit={handleForm}>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="email"
          changeEvent={handleChange}
        />
        <Input
          name="password"
          type="password"
          value={password}
          placeholder="password"
          changeEvent={handleChange}
        />
        <Button type="submit" additionalClasses="fullshape">
          Log In
          </Button>
      </form>
    </div>
  );
}

export default SignIn;
