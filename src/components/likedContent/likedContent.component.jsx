import React from "react";

import "./likedContent.style.scss";

import Spinner from "../spinner/spinner.component";
import Post from "../post/post.component";


const LikedContent = props => {
  return (
    <div className="container lp">
      <h1>Liked articles</h1>
      <div className="lp-holder flex">
        {props.posts.length > 0 ? (
          props.posts.map(post => (
            <Post key={post.id} post={post} state={{ from: "liked" }} />
          ))
        ) : (
            <p>No liked</p>
          )}
      </div>
    </div>
  );
};

export default Spinner(LikedContent);
