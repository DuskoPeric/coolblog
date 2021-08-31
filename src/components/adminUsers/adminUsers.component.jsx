import React, { useState } from "react";

import "./adminUsers.style.scss";

import { getDataList } from "../../services/Utils";

import { connect } from "react-redux";
import { selectAuthors } from "../../redux/authors/author.selectors";
import { setUser } from "../../redux/user/user.actions";
import { setAuthors } from "../../redux/authors/authors.actions";

import AdminUser from "../adminUser/adminUser.component";
import Popup from "../popup/popup.component";
import AdminRole from "../adminRole/adminRole.component";
import { updateUserRole } from "../../services/users";



const AdminUsers = (props) => {
  const [isOpenRolePopup, setIsOpenRolePopup] = useState(false);
  const [choosenRole, setChoosenRole] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const updateUser = async () => {
    await updateUserRole(activeUser, choosenRole);
    setIsOpenRolePopup(false);
    props.setAuthors(await getDataList("/users"));
  };

  const changeRoleHandler = (role, id) => {
    setIsOpenRolePopup(true);
    setChoosenRole(role);
    setActiveUser(id);
  }

  const { users } = props;

  return (
    <div>
      <div className="admin-users-table">
        <div className="head-tab">
          <div className="head-name">Name</div>
          <div className="head-email">Email</div>
          <div className="head-role">Role</div>
        </div>
        {users.map(user => (
          <AdminUser
            key={user.id}
            user={user}
            changeRole={(role, id) => changeRoleHandler(role, id)}
          />
        ))}
      </div>
      {isOpenRolePopup ? (
        <Popup closePopup={() => setIsOpenRolePopup(false)}>
          <AdminRole
            title="Choose role"
            activeRole={choosenRole}
            submitChange={updateUser}
            closePopup={() => setIsOpenRolePopup(false)}
            changeRole={role => setChoosenRole(role)}
          />
        </Popup>
      ) : null}
    </div>
  );
}
const mapStateToProps = state => ({
  users: selectAuthors(state)
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setAuthors: authors => dispatch(setAuthors(authors))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);
