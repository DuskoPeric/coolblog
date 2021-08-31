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
  const history = useHistory();

  const handleForm = async event => {
    event.preventDefault();
    setSending(true)

    if (password !== confirmPassword) {
      alert("passwords dont match");
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
        var usere = auth.currentUser;

        usere.sendEmailVerification().then(function () {
          setIsOpenPopup(true);
          setSending(false);
          auth.signOut();

        }).catch(function (error) {
          setSending(false)
          alert(error.message)
        });
      }).catch(error => { alert(error.message); setSending(false) });



    } catch (error) {
      alert("error : " + error.message);
    }
  };

  const finishRegistration = () => {
    setIsOpenPopup(false)
    history.push("/");
  }

  const handleChange = event => {
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
      <h2>I do not have a account</h2>
      <p className="subtitle">Sign up with your email and password</p>
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
        <Input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="confirm password"
          changeEvent={handleChange}
        />
        <Checkbox
          changeEvent={handleChange}
          text="Do you want to be a writer?"
          value={isWriter}
          name="isWriter"
        />
        {!sending ? <Button type="submit" additionalClasses="fullshape">
          Register
          </Button> : <p>Sending...</p>}

      </form>
      {isOpenPopup && <Popup closePopup={finishRegistration}>
        <p>Thank you for registring. We sent you a verification email</p>
      </Popup>
      }

    </div>
  );
}

export default Register;
