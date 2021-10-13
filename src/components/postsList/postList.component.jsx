import React from "react";

import "./postList.style.scss";

import { useSelector } from "react-redux";
import {
  selectFilteredPosts,
  selectedFilterId,
  selectFilterBy
} from "../../redux/posts/posts.selectors";

import Post from "../post/post.component";
import Spinner from "../spinner/spinner.component";
import EmptyList from "../emptyList/emptyList.component";

const PostList = () => {
  const posts = useSelector(state=>selectFilteredPosts(selectedFilterId(state), selectFilterBy(state))(
    state
  ));

  const postsList =
    posts.length > 0 ? (
      posts.map(post => {
        return <Post key={post.id} post={post} state={{ from: "home" }} />;
      })
    ) : (
        <EmptyList message="No posts"/>
      );

  return <div className="posts-holder flex">{postsList}</div>;
};


export default Spinner(PostList);
