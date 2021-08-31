import React from "react";

import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import ProfileContent from "../../components/profileContent/profileContent.component";


const ProfilePage = ({ user }) => {
  return <ProfileContent isLoaded={user} user={user} />;
}

const mapStateToProps = state => ({
  user: selectCurrentUser(state)
});

export default connect(mapStateToProps)(ProfilePage);
