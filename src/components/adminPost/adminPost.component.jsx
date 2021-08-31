import React from "react";

import "./adminPost.style.scss";

import { timestampConvertor } from "../../services/Utils";

import { connect } from "react-redux";
import { selectSpecificAuthors } from "../../redux/authors/author.selectors";
import { selectSpecificCategory } from "../../redux/categories/categories.selectors";

const AdminPost = (props) => {
  const { title, id, published, commentsNo } = props.post;
  return (
    <div className="item-tab">
      <div className="item-published">
        {timestampConvertor(published.seconds)}
      </div>
      <div className="item-title">
        <p>{title}</p>
      </div>
      <div className="item-author">{props.author}</div>
      <div className="item-category">{props.category}</div>
      <div className="item-comments">
        <div>{commentsNo}</div>
        <span onClick={() => {
          props.editComments(id);
        }} className="material-icons">edit</span>
      </div>
      <div className="item-delete">
        <span onClick={() => {
          props.delete(id);
        }} className="material-icons">delete</span>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({
  author: selectSpecificAuthors(ownProps.post.authorId)(state),
  category: selectSpecificCategory(ownProps.post.categoryId)(state)
});

export default connect(mapStateToProps)(AdminPost);
