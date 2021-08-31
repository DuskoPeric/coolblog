import React from "react";

import "./editProfile.style.scss";

import Button from "../button/button.component";

const EditProfile = props => {
  const { name, handleChange, inputError, submitChange, closePopup } = props;
  return (
    <div className="edit-profile">
      <input
        className={inputError ? "red-border" : null}
        type="text"
        value={name}
        onChange={handleChange}
      />
      <div className="action">
        <Button
          additionalClasses="submit margin-right"
          onClick={submitChange}
        >
          OK
        </Button>
        <Button additionalClasses="cancel" onClick={closePopup}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
