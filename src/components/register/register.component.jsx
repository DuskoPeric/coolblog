import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./register.style.scss";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import Input from "../input/input.component";
import Checkbox from "../checkbox/checkbox.component";
import Button from "../button/button.component";
import Popup from "../popup/popup.component";

const Register = () => {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isWriter, setIsWriter] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('')
  const history = useHistory();

  const handleForm = async event => {
    event.preventDefault();
    setSending(true)

    if (password !== confirmPassword) {
      setFormError("Passwords do not match")
      setSending(false);
      return;
    }
    if(displayName===''){
      setFormError("Name must not be blank")
      setSending(false);
      return;
    }

    try {
      auth.createUserWithEmailAndPassword(
        email,
        password
      ).then(async (userCredential) => {
        const role = isWriter ? 2 : 1;
        await createUserProfileDocument(userCredential.user, { displayName, role: role, liked: [] });
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFormError('');
        var usere = auth.currentUser;

        usere.sendEmailVerification().then(function () {
          setIsOpenPopup(true);
          setSending(false);
          auth.signOut();

        }).catch(function (error) {
          setSending(false)
          setFormError(error.message)
        });
      }).catch(error => { setFormError(error.message); setSending(false) });



    } catch (error) {
      setFormError(error.message);
    }
  };

  const finishRegistration = () => {  
    setIsOpenPopup(false)
    history.push("/");
  }

  const handleChange = event => {
    setFormError('');
    const { value, name, checked } = event.target;
    if (name === "isWriter") {
      setIsWriter(checked)
    } else if (name === "email") {
      setEmail(value)
    } else if (name === "displayName") {
      setDisplayName(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "confirmPassword") {
      setConfirmPassword(value)
    }
  };

  return (
    <div className="register">
      <h2>Sign Up</h2>
      {formError!==''?<div className="error-box">{formError}</div>:null}
      <form onSubmit={handleForm}>
        <Input
          name="displayName"
          type="text"
          value={displayName}
          placeholder="Name"
          changeEvent={handleChange}
        />
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
        <Input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          changeEvent={handleChange}
        />
        <Checkbox
          changeEvent={handleChange}
          text="Do you want to be a writer?"
          value={isWriter}
          name="isWriter"
        />
        {!sending ? <Button type="submit" additionalClasses="full-width">
          Register
          </Button> : <p>Sending...</p>}

      </form>
      {isOpenPopup && <Popup closePopup={finishRegistration}>
        <p className="popup-text">Thank you for registring. We sent you a verification email</p>
      </Popup>
      }

    </div>
  );
}

export default Register;
