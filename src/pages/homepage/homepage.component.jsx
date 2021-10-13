import React from "react";
import { useSelector } from "react-redux";

import "./homepage.style.scss";

import SideFilter from "../../components/filter/filter.component";
import PostsList from "../../components/postsList/postList.component";

const HomePage = () => {
  const isLoaded=useSelector(state=>state.posts.postsLoaded)
  return (
    <div className="home container flex">
      <SideFilter />
      <PostsList isLoaded={isLoaded} />
    </div>
  );
}


export default HomePage;
