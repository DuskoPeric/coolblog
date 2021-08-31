import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { auth, firestore } from "./firebase/firebase.utils";
import { getDataList } from "./services/Utils";

import "./App.scss";

import { connect } from "react-redux";
import { setUser } from "./redux/user/user.actions";
import { setPosts } from "./redux/posts/posts.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { setAuthors } from "./redux/authors/authors.actions";
import { setCategories } from "./redux/categories/categories.actions";

import Header from "./components/header/header.component";
import SignInPage from "./pages/register-signin/register-signin.component";
import HomePage from "./pages/homepage/homepage.component";
import LikedPage from "./pages/likedpage/likedpage.component";
import ProfilePage from "./pages/profilepage/profilepage.component";
import AddPostPage from "./pages/addPostPage/addPostPage.component";
import MyPostsPage from "./pages/mypostspage/mypostspage.component";
import EditPostPage from "./pages/editPostPage/editPostPage.component";
import MyAdminPage from "./pages/myAdminPage/myAdminPage.component";
import PostPage from "./pages/postpage/postpage.component";
import Notification from "./components/notification/notification.component";


const App = (props) => {
  let unsubscribe = null;
  const { setUser, user } = props;
  const [showNotification, setShowNotification] = useState(false)

  const getData = async () => {
    props.setPosts(await getDataList("/posts"));
    props.setAuthors(await getDataList("/users"));
    props.setCategories(await getDataList("/categories"));
  };

  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged(async user => {
      if (user && user.emailVerified) {
        setShowNotification(false)
        const userRef = await firestore.doc(`users/${user.uid}`);
        userRef.onSnapshot(snapShot => {
          setUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else if (user && !user.emailVerified) {
        setShowNotification(true)
        //auth.signOut();
      }
      else if (user === null) {
        setUser(user);
      }
    });

    getData();

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/login"
        render={() => (user ? <Redirect to="/" /> : <SignInPage />)}
      />
      <Route exact path="/post/:postId" component={PostPage} />
      <Route path="/liked" component={LikedPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/myposts" component={MyPostsPage} />
      <Route path="/addPost" render={() => (user && user.role > 1 ? <AddPostPage /> : <Redirect to="/" />)} />
      <Route path="/edit/:postId" component={EditPostPage} />
      <Route path="/myadmin" component={MyAdminPage} />
      {showNotification && <Notification hideNotify={() => setShowNotification(false)} />}
    </div>
  );
}

const mapStateToProps = state => ({
  user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setPosts: posts => dispatch(setPosts(posts)),
  setAuthors: authors => dispatch(setAuthors(authors)),
  setCategories: categories => dispatch(setCategories(categories))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
