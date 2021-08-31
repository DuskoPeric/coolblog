import React, { useState } from "react";

import "./addComment.style.scss";

import { connect } from "react-redux";
import { setPosts } from "../../redux/posts/posts.actions";

import { getDataList } from "../../services/Utils";

import Button from "../button/button.component";
import { addComment } from "../../services/posts";

const AddComment = (props) => {
  const [comment, setComment] = useState('');

  const handleForm = async event => {
    event.preventDefault();
    try {
      await addComment(props.postId, comment, props.author);
      setComment("");
      props.newComment();
      props.setPosts(await getDataList("/posts"));

    } catch (error) {
      alert("error creating comment " + error);
    }
  };

  const handleChange = event => {
    const { value } = event.target;
    setComment(value)
  };

  return (
    <div className="add-comment">
      <h3>Leave a comment:</h3>
      <form onSubmit={handleForm}>
        <textarea
          placeholder="comment"
          onChange={handleChange}
          value={comment}
        ></textarea>
        <Button type="submit" additionalClasses="fullshape">
          Post
          </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  author: state.user.user.id
});
const mapDispatchToProps = dispatch => ({
  setPosts: posts => dispatch(setPosts(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
