import React from "react";

import "./adminUser.style.scss";

const AdminUser = (props) => {
  const { displayName, email, role, id } = props.user;
  let displayRole = "Commenter";
  switch (role) {
    case 2:
      displayRole = "Writer";
      break;
    case 3:
      displayRole = "Admin";
      break;
    default:
      break;
  }
  return (
    <div className="user-tab">
      <div className="item-name">
        <p>{displayName}</p>
      </div>
      <div className="item-email">
        <p>{email}</p>
      </div>
      <div className="item-role">
        <div>{displayRole}</div>
        <span onClick={() => {
          props.changeRole(role, id);
        }} className="material-icons">edit</span>
      </div>
    </div>
  );
}

export default AdminUser;
