import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "./header.style.scss";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import Button from "../button/button.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = () => {
  const user=useSelector(state=>selectCurrentUser(state))
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <header>
      <div className="container flex-between">
        <div className="left-content-header flex align-center">
          <Link className="logo" to="/">
            Coo<span>lBl</span>og
          </Link>
          <nav className="left-nav">
            <ul className="flex">
              {user ? (
                user.role > 1 ? (
                  <li>
                    <NavLink to="/myposts">My Posts</NavLink>
                  </li>
                ) : null
              ) : null}
            </ul>
          </nav>
        </div>
        <div className="right-content-header flex align-center">
          {user ? (
            user.role > 2 ? (
              <Link to="/myadmin">
                <Button>Admin</Button>
              </Link>
            ) : null
          ) : null}

          {user ? (
            user.role > 1 ? (
              <Link className="writenew" to="/addPost">
                <Button>Write new</Button>
              </Link>
            ) : null
          ) : null}
          {user ? (
            <div className="liked">
              <Link to="/liked">
                <span className="icon-liked material-icons">favorite</span>
              </Link>
            </div>
          ) : null}

          {user ? (
            <Fragment>
              <div className="profile">
                <Link className="profile-link" to="/profile">
                  <span className="material-icons">person</span>
                  {user.displayName}
                </Link>
              </div>
              <span className="material-icons logout" onClick={() => auth.signOut()}>logout</span>
            </Fragment>
          ) : (
              <Link className="login" to="/login">
                <span className="material-icons">login</span>
              </Link>
            )}
        </div>
        <div className="right-header-mobile">
          {user ? <Link to="/profile">
            <span className="material-icons">person</span>
            {user.displayName}
          </Link> : null}
          <span onClick={() => { setOpenMenu(!openMenu) }} className="material-icons burger-menu">menu</span>
          {openMenu ? <div className="mobile-nav">
            <ul>
              {user ? (
                user.role > 1 ? (
                  <li onClick={() => { setOpenMenu(!openMenu) }}>
                    <NavLink to="/myposts">My Posts</NavLink>
                  </li>
                ) : null
              ) : null}
              {user ? (
                user.role > 1 ? (
                  <li onClick={() => { setOpenMenu(!openMenu) }}>
                    <NavLink to="/addPost">Write new</NavLink>
                  </li>
                ) : null
              ) : null}
              {user ? (
                user.role > 2 ? (
                  <li onClick={() => { setOpenMenu(!openMenu) }}>
                    <NavLink to="/myadmin">Admin</NavLink>
                  </li>
                ) : null
              ) : null}
              {user ? (
                <li onClick={() => { setOpenMenu(!openMenu) }}>
                  <NavLink to="/liked">Liked</NavLink>
                </li>
              ) : null}
              {user ? (
                <li onClick={() => { setOpenMenu(!openMenu) }}>
                  <a onClick={() => auth.signOut()}>Logout</a>
                </li>
              ) : (
                  <li onClick={() => { setOpenMenu(!openMenu) }}>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
            </ul>
          </div> : null}

        </div>
      </div>
    </header>
  );
};

export default Header;
