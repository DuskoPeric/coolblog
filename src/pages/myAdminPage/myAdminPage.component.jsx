import React, { useEffect } from "react";
import { Route, NavLink, useHistory } from "react-router-dom";

import "./myAdminPage.style.scss";

import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import AdminPosts from "../../components/adminPosts/adminPosts.component";
import AdminUsers from "../../components/adminUsers/adminUsers.component";
import AdminCategories from "../../components/adminCategories/adminCategories.component";

const MyAdminPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.user) {
      if (props.user.role !== 3) {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, [props.user])

  const { isLoaded } = props;

  return (
    <div className="admin-panel container ">
      <NavLink
        exact
        className="section-link"
        to={`${props.match.path}/`}
      >
        Posts
        </NavLink>
      <NavLink className="section-link" to={`${props.match.path}/users`}>
        Users
        </NavLink>
      <NavLink
        className="section-link"
        to={`${props.match.path}/categories`}
      >
        Categories
        </NavLink>
      <div>
        <Route
          exact
          path={`${props.match.path}/`}
          render={() => <AdminPosts isLoaded={isLoaded} />}
        />
        <Route
          path={`${props.match.path}/users`}
          component={AdminUsers}
        />
        <Route
          path={`${props.match.path}/categories`}
          component={AdminCategories}
        />
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  user: selectCurrentUser(state),
  isLoaded: state.posts.postsLoaded
});

export default connect(
  mapStateToProps,
  null
)(MyAdminPage);
