import React from "react";

import "./mypostspage.style.scss";

import { useSelector } from "react-redux";
import { selectFilteredPosts } from "../../redux/posts/posts.selectors";

import MyPostsContent from "../../components/mypostsContent/mypostsContent.component";


const MyPostsPage = () => {
  const isLoaded=useSelector(state=>state.posts.postsLoaded);
  const myPosts=useSelector(state=>selectFilteredPosts(
    state.user.user ? state.user.user.id : null,
    "author"
  )(state))
  return (
    <MyPostsContent
      isLoaded={isLoaded}
      posts={myPosts}
    />
  );
}

export default MyPostsPage;
