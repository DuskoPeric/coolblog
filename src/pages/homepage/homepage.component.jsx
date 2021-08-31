import React from "react";
import { connect } from "react-redux";

import "./homepage.style.scss";

import SideFilter from "../../components/filter/filter.component";
import PostsList from "../../components/postsList/postList.component";

const HomePage = (props) => {
  return (
    <div className="home container flex">
      <SideFilter />
      <PostsList isLoaded={props.isLoaded} />
    </div>
  );
}

const mapStateToProps = state => ({
  isLoaded: state.posts.postsLoaded
});

export default connect(mapStateToProps)(HomePage);
