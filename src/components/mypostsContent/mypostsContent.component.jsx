import React from "react";

import "./mypostsContent.style.scss";

import Spinner from "../spinner/spinner.component";
import Post from "../post/post.component";


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
            <p>No posts</p>
          )}
      </div>
    </div>
  );
};

export default Spinner(MyPostsContent);
