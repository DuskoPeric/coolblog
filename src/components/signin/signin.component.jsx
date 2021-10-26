import React, { useState } from "react";
import { useHistory } from 'react-router'

import "./signin.style.scss";

import { auth } from "../../firebase/firebase.utils";

import Button from "../button/button.component";
import Input from "../input/input.component";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleForm = async event => {
    event.preventDefault();
    if(auth.currentUser){
      auth.signOut();
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setFormError("");
      //history.go(0);
    } catch (error) {
      setFormError(error.message)
    }
  };

  const handleChange = event => {
    setFormError('');
    const { value, name } = event.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="signin">
      <h2>Log In</h2>
      {formError!==''?<div className="error-box">{formError}</div>:null}
      <form onSubmit={handleForm}>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          changeEvent={handleChange}
        />
        <Input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          changeEvent={handleChange}
        />
        <Button type="submit" additionalClasses="full-width">
          Log In
          </Button>
      </form>
    </div>
  );
}

export default SignIn;
