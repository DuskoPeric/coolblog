import React, { useState, useEffect } from "react";

import "./editComments.style.scss";

import {
  getAllComments,
  updateNumberOfComments
} from "../../services/getComments";

import Button from "../button/button.component";
import Comment from "../comment/comment.component";
import { deleteComment } from "../../services/posts";

const EditComments = (props) => {

  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const getComments = async () => {
    setCommentsLoaded(false);
    const allComments = await getAllComments(props.postComments);
    setComments(allComments);
    setCommentsLoaded(true);
  };

  const deleteSelectedComment = async id => {
    await deleteComment(props.postComments, id);
    await updateNumberOfComments(
      comments.length,
      props.postComments,
      false
    );
    await getComments();
    props.reloadPosts();
  };

  useEffect(() => {
    getComments()
  }, []);

  return (
    <div className="commentsList">
      <h2>Comments</h2>
      <div className="commentsContainer">
        {commentsLoaded ? (
          comments.map(comment => {
            return (
              <div key={comment.id} className="commentsBox">
                <Comment comment={comment} />
                <Button
                  additionalClasses="margin-top-10"
                  onClick={() => deleteSelectedComment(comment.id)}
                >
                  Delete
                  </Button>
              </div>
            );
          })
        ) : (
            <p>Loading...</p>
          )}
      </div>
    </div>
  );
}

export default EditComments;
