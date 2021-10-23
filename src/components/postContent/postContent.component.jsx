import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";

import "./postContent.style.scss";

import { useSelector } from "react-redux";
import { selectSpecificAuthors } from "../../redux/authors/author.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { timestampConvertor } from "../../services/Utils";

import Comment from "../comment/comment.component";
import AddComment from "../addComment/addComment.component";
import Button from "../button/button.component";
import { addLike } from "../../services/users";
import Spinner from "../spinner/spinner.component";


const PostContent = (props) => {
  const author=useSelector(state=>selectSpecificAuthors(props.post.authorId)(state));
  const user=useSelector(state=>selectCurrentUser(state))

  const changeLiked = async add => {
    const updatedLiked = add
      ? [...user.liked, props.post.id]
      : user.liked.filter(item => item !== props.post.id);

    addLike(user.id, updatedLiked);
  };

  const {
    title,
    published,
    content,
    imgUrl,
    id,
    authorId,
    commentsNo
  } = props.post;
  const { onChangeComment } = props;
  let back = null;
  const dest =
    props.history.location.state.from === "home"
      ? ""
      : props.history.location.state.from;
  if (props.history.location.state) {
    back = (
      <Link to={`/${dest}`} className="link">
        <span className="material-icons">navigate_before</span>Back
        </Link>
    );
  }

  return (
    <div className="post-content container">
      {back}

      <h1 className="post-title">{title}</h1>
      <div className="author-date">
        <p>
          <span className="icon material-icons">history_edu</span>
          {author}
          <span>
            <span className="icon material-icons">today</span>
            {published ? timestampConvertor(published.seconds) : null}
          </span>
        </p>
      </div>
      {imgUrl && <div className="post-img">
        <img src={imgUrl} alt={title} />
      </div>}


      <div
        className="post-html-content"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      ></div>
      {user ? (
        user.liked ? (
          <div className="favorite" onClick={() => changeLiked(!user.liked.includes(id))}>
            <Button additionalClasses="fullshape">
              {user.liked.includes(id) ? (<><span className="material-icons">favorite_border</span> Remove from favorites</>) : (<><span className="material-icons">favorite</span>Add to favorites</>)}
            </Button>
          </div>

        ) : null
      ) : null}

      {user ? (
        user.id === authorId ? (
          <div className="favorite">
            <NavLink to={"/edit/" + id}>
              <Button additionalClasses="fullshape">
                <span className="material-icons">edit</span>Edit post
                </Button>
            </NavLink>
          </div>
        ) : null
      ) : null}

      <p>
        {commentsNo} {commentsNo === 1 ? " comment " : " comments"}
      </p>

      <div className="comments">
        {user ? (
          <AddComment postId={id} newComment={onChangeComment} />
        ) : null}
        <div className="comments-list">
          {props.comments.map(comment => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}


export default Spinner(withRouter(PostContent)) ;
