import React from "react";

import "./adminRole.style.scss";

import Button from "../button/button.component";

const AdminRole = props => {
  const { title, closePopup, submitChange, activeRole, changeRole } = props;
  return (
    <div className="adminRoleContent">
      <h2>{title}</h2>
      <div className="role-list">
        <div
          onClick={() => changeRole(1)}
          className={activeRole === 1 ? "active" : ""}
        >
          Commenter
        </div>
        <div
          onClick={() => changeRole(2)}
          className={activeRole === 2 ? "active" : ""}
        >
          Writer
        </div>
        <div
          onClick={() => changeRole(3)}
          className={activeRole === 3 ? "active" : ""}
        >
          Admin
        </div>
      </div>
      <div className="action">
        <Button additionalClasses="submit margin-right" onClick={submitChange}>
          Ok
        </Button>
        <Button additionalClasses="cancel" onClick={closePopup}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AdminRole;
