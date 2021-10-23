import React from "react";

import "./mypostsContent.style.scss";

import Spinner from "../spinner/spinner.component";
import Post from "../post/post.component";
import EmptyList from "../emptyList/emptyList.component";


const MyPostsContent = ({ posts }) => {
  return (
    <div className="container mp">
      <h1>My posts</h1>
      <div className="mp-holder flex">
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} post={post} state={{ from: "myposts" }} />
          ))
        ) : (
            <EmptyList message="No posts"/>
          )}
      </div>
    </div>
  );
};

export default Spinner(MyPostsContent);
