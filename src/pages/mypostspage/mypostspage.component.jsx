import React, { Component } from "react";

import "./mypostspage.style.scss";

import { connect } from "react-redux";
import { selectFilteredPosts } from "../../redux/posts/posts.selectors";

import MyPostsContent from "../../components/mypostsContent/mypostsContent.component";


const MyPostsPage = ({ isLoaded, myPosts }) => {
  return (
    <MyPostsContent
      isLoaded={isLoaded}
      posts={myPosts}
    />
  );
}

const mapStateToProps = state => ({
  isLoaded: state.posts.postsLoaded,
  myPosts: selectFilteredPosts(
    state.user.user ? state.user.user.id : null,
    "author"
  )(state)
});

export default connect(
  mapStateToProps,
  null
)(MyPostsPage);
