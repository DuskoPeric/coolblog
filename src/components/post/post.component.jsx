import React from "react";
import { Link } from "react-router-dom";

import "./post.style.scss";

import { timestampConvertor } from "../../services/Utils";

import { useSelector } from "react-redux";
import { selectSpecificAuthors } from "../../redux/authors/author.selectors";

const Post = ({ post, state }) => {
  const author=useSelector(state=>selectSpecificAuthors(post.authorId)(state))
  return (
    <div className="post">
      <Link to={{ pathname: `post/${post.id}`, state: state }}>
        <div>
          <div className="img-holder">
            <img src={post.imgUrl ? post.imgUrl : 'https://duskoperic.com/1.jpg'} alt={post.title} />
          </div>
          <p className="author-date">
            {author} / {timestampConvertor(post.published.seconds)}
          </p>
          <h3>{post.title}</h3>
          <p className="short-desc">{post.shortDescription}</p>
        </div>
        <p className="comments">
          <span className="comment-icon material-icons">chat_bubble</span>
          {post.commentsNo}
        </p>
      </Link>
    </div>
  );
};

export default Post;
