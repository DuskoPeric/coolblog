import React, { useState } from "react";

import "./profileContent.style.scss";

import { useDispatch } from "react-redux";

import { getDataList } from "../../services/Utils";

import Spinner from "../spinner/spinner.component";
import Popup from "../popup/popup.component";
import EditProfile from "../editProfile/editProfile.component";
import { changeUserName } from "../../services/users";
import { userActions } from "../../redux/user/user.reducer";
import { authorsActions } from "../../redux/authors/author.reducer";

const ProfileContent = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  const { displayName, role, email } = user;

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [name, setName] = useState('');
  const [inputError, setInputError] = useState(false);

  const openPopup = () => {
    setIsOpenPopup(true);
    setName(displayName);
  };

  const closePopup = () => {
    setIsOpenPopup(false);
    setInputError(false);
  }

  const handleChange = event => {
    setName(event.target.value);
  };

  const changeName = async () => {
    if (name === "") {
      setInputError(true);
    } else {
      await changeUserName(user.id, name);
      setInputError(false);
      setIsOpenPopup(false);
      dispatch(userActions.setUser({ ...user, displayName: name }));
      dispatch(authorsActions.setAuthors(await getDataList("/users")));
    }
  };

  let roleImg = <span className="material-icons">local_library</span>;
  if (role === 2) {
    roleImg = <span className="material-icons">history_edu</span>;
  } else if (role === 3) {
    roleImg = <span className="material-icons">admin_panel_settings</span>;
  }

  return (
    <div className="container">
      <div className="profile-card">
        <div className="edit">
          <span onClick={openPopup} className="material-icons">edit</span>
        </div>
        <div className="role">{roleImg}</div>
        <h2>{displayName}</h2>
        <p>
          <span className="material-icons">mail_outline</span>
          {email}
        </p>
      </div>
      {isOpenPopup ? (
        <Popup title="Change name"
          closePopup={closePopup}>
          <EditProfile
            name={name}
            handleChange={handleChange}
            inputError={inputError}
            closePopup={closePopup}
            submitChange={changeName}
          />
        </Popup>
      ) : null}
    </div>
  );
}

export default Spinner(ProfileContent);
