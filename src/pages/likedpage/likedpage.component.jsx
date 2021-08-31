import React from "react";

import { connect } from "react-redux";
import { selectLikedPosts } from "../../redux/posts/posts.selectors";

import LikedContent from "../../components/likedContent/likedContent.component";

const LikedPage = (props) => {
  const { isLoaded, likedPosts } = props
  return (
    <LikedContent
      isLoaded={isLoaded}
      posts={likedPosts}
    />
  );

}
const mapStateToProps = state => ({
  isLoaded: state.posts.postsLoaded,
  likedPosts: selectLikedPosts(state.user.user ? state.user.user.liked : [])(
    state
  )
});

export default connect(
  mapStateToProps,
  null
)(LikedPage);
