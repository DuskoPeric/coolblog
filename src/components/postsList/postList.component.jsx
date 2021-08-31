import React from "react";

import "./postList.style.scss";

import { connect } from "react-redux";
import {
  selectFilteredPosts,
  selectedFilterId,
  selectFilterBy
} from "../../redux/posts/posts.selectors";

import Post from "../post/post.component";
import Spinner from "../spinner/spinner.component";

const PostList = props => {
  const { posts } = props;

  const postsList =
    posts.length > 0 ? (
      posts.map(post => {
        return <Post key={post.id} post={post} state={{ from: "home" }} />;
      })
    ) : (
        <p>No posts</p>
      );

  return <div className="posts-holder flex">{postsList}</div>;
};

const mapStateToProps = state => ({
  posts: selectFilteredPosts(selectedFilterId(state), selectFilterBy(state))(
    state
  )
});

export default connect(mapStateToProps)(Spinner(PostList));
