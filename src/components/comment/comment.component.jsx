import React from "react";

import "./comment.style.scss";

import { connect } from "react-redux";
import { selectSpecificAuthors } from "../../redux/authors/author.selectors";

import { timestampConvertor } from "../../services/Utils";

const Comment = props => {
  const { comment, author } = props;
  return (
    <div className="comment-content">
      <p className="author">{author}</p>
      <p className="time">{timestampConvertor(comment.time.seconds)}</p>
      <p className="content">{comment.comment}</p>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  author: selectSpecificAuthors(ownProps.comment.authorId)(state)
});

export default connect(mapStateToProps)(Comment);
