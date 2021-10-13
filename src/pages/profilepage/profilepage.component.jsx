import React from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import ProfileContent from "../../components/profileContent/profileContent.component";


const ProfilePage = () => {
  const user=useSelector(state=>selectCurrentUser(state));
  return <ProfileContent isLoaded={user} user={user} />;
}

export default ProfilePage;
