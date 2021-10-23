import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { auth, firestore } from "./firebase/firebase.utils";
import { getDataList } from "./services/Utils";

import "./App.scss";

import { useSelector,useDispatch } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";

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
import { userActions } from "./redux/user/user.reducer";
import { postsActions } from "./redux/posts/posts.reducer";
import { categoriesActions } from "./redux/categories/categories.reducer";
import { authorsActions } from "./redux/authors/author.reducer";


const App = () => {
  const dispatch=useDispatch();
  const user=useSelector(state=>selectCurrentUser(state))
  let unsubscribe = null;
  const [showNotification, setShowNotification] = useState(false)

  const getData = async () => {
    dispatch(postsActions.setPosts(await getDataList("/posts")));
    dispatch(authorsActions.setAuthors(await getDataList("/users")));
    dispatch(categoriesActions.setCategories(await getDataList("/categories")));
  };

  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged(async user => {
      if (user && user.emailVerified) {
        setShowNotification(false)
        const userRef = await firestore.doc(`users/${user.uid}`);
        userRef.onSnapshot(snapShot => {
          dispatch(userActions.setUser({
            id: snapShot.id,
            ...snapShot.data()
          }));
        });
      } else if (user && !user.emailVerified) {
        setShowNotification(true)
      }
      else if (user === null) {
        dispatch(userActions.setUser(user));
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
      <Route path="/liked" render={() => (user ?<LikedPage />: <Redirect to="/" /> )}  />
      <Route path="/profile" render={() => (user ?<ProfilePage />: <Redirect to="/" /> )} />
      <Route path="/myposts"  render={() => (user ?<MyPostsPage />: <Redirect to="/" /> )} />
      <Route path="/addPost" render={() => (user && user.role > 1 ? <AddPostPage /> : <Redirect to="/" />)} />
      <Route path="/edit/:postId" component={EditPostPage} />
      <Route path="/myadmin" component={MyAdminPage} />
      {showNotification && <Notification hideNotify={() => setShowNotification(false)} />}
    </div>
  );
}

export default App;
