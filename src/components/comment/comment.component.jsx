import React from "react";

import "./comment.style.scss";

import { useSelector } from "react-redux";
import { selectSpecificAuthors } from "../../redux/authors/author.selectors";

import { timestampConvertor } from "../../services/Utils";

const Comment = props => {
  
  const { comment } = props;
  const author=useSelector(state=>selectSpecificAuthors(comment.authorId)(state))
  return (
    <div className="comment-content">
      <p className="author">{author}</p>
      <p className="time">{timestampConvertor(comment.time.seconds)}</p>
      <p className="content">{comment.comment}</p>
    </div>
  );
};

export default Comment;
