import React from "react";

import { useSelector } from "react-redux";
import { selectLikedPosts } from "../../redux/posts/posts.selectors";

import LikedContent from "../../components/likedContent/likedContent.component";

const LikedPage = () => {
  const isLoaded=useSelector(state=>state.posts.postsLoaded);
  const likedPosts=useSelector(state=>selectLikedPosts(state.user.user ? state.user.user.liked : [])(
    state
  ))
  return (
    <LikedContent
      isLoaded={isLoaded}
      posts={likedPosts}
    />
  );

}

export default LikedPage;
