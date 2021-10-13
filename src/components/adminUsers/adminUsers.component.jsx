import React, { useState } from "react";

import "./adminUsers.style.scss";

import { getDataList } from "../../services/Utils";

import { useSelector,useDispatch } from "react-redux";
import { selectAuthors } from "../../redux/authors/author.selectors";

import AdminUser from "../adminUser/adminUser.component";
import Popup from "../popup/popup.component";
import AdminRole from "../adminRole/adminRole.component";
import { updateUserRole } from "../../services/users";
import { userActions } from "../../redux/user/user.reducer";
import { authorsActions } from "../../redux/authors/author.reducer";



const AdminUsers = (props) => {
  const dispatch = useDispatch();
  const users=useSelector(state=>selectAuthors(state))
  const [isOpenRolePopup, setIsOpenRolePopup] = useState(false);
  const [choosenRole, setChoosenRole] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const updateUser = async () => {
    await updateUserRole(activeUser, choosenRole);
    setIsOpenRolePopup(false);
    dispatch(authorsActions.setAuthors(await getDataList("/users")));
  };

  const changeRoleHandler = (role, id) => {
    setIsOpenRolePopup(true);
    setChoosenRole(role);
    setActiveUser(id);
  }

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

export default AdminUsers;
