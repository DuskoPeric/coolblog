import React, { useState } from "react";

import "./addComment.style.scss";

import { connect,useSelector,useDispatch } from "react-redux";

import { getDataList } from "../../services/Utils";

import Button from "../button/button.component";
import { addComment } from "../../services/posts";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { postsActions } from "../../redux/posts/posts.reducer";

const AddComment = (props) => {
  const dispatch=useDispatch();
  const author=useSelector(state=>selectCurrentUserId(state))
  const [comment, setComment] = useState('');

  const handleForm = async event => {
    event.preventDefault();
    try {
      await addComment(props.postId, comment, author);
      setComment("");
      props.newComment();
      dispatch(postsActions.setPosts(await getDataList("/posts")));

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


export default AddComment;
