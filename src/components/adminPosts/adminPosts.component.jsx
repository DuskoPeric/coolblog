import React, { useState } from "react";

import "./adminPosts.style.scss";

import { getDataList } from "../../services/Utils";

import { useSelector,useDispatch } from "react-redux";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";

import AdminPost from "../adminPost/adminPost.component";
import EditComments from "../editComments/editComments.component";
import Spinner from "../spinner/spinner.component";
import Popup from "../popup/popup.component";
import DeleteItem from "../deleteItem/deleteItem.component";
import { deletePost } from "../../services/posts";
import { postsActions } from "../../redux/posts/posts.reducer";

const AdminPosts = (props) => {
  const dispatch=useDispatch();
  const posts=useSelector(state=>selectCurrentPosts(state));
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenCommentsPopup, setIsOpenCommentsPopup] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(true);

  const deleteSelectedPost = async () => {
    await deletePost(activePost);
    setPostLoaded(false);
    await dispatch(postsActions.setPosts(await getDataList("/posts")));
    setPostLoaded(true);
    setIsOpenPopup(false);
  };

  return (
    <div>
      <div className="admin-post-table">
        <div className="head-tab">
          <div className="head-published">Published</div>
          <div className="head-title">Title</div>
          <div className="head-author">Author</div>
          <div className="head-category">Category</div>
          <div className="head-comments">Comments</div>
          <div className="head-delete">Delete</div>
        </div>

        {postLoaded ? (
          posts.map(post => (
            <AdminPost
              key={post.id}
              post={post}
              delete={id => {
                setIsOpenPopup(true);
                setActivePost(id);
              }
              }
              editComments={id => {
                setIsOpenCommentsPopup(true);
                setActivePost(id);
              }
              }
            />
          ))
        ) : (
            <p>Loading...</p>
          )}
      </div>
      {isOpenPopup ? (
        <Popup
          closePopup={() => setIsOpenPopup(false)}
          title=""
        >
          <DeleteItem
            title="Do you really want to delete this post?"
            submitChange={deleteSelectedPost}
            closePopup={() => setIsOpenPopup(false)}
          />
        </Popup>
      ) : null}
      {isOpenCommentsPopup ? (
        <Popup
          closePopup={() => setIsOpenCommentsPopup(false)}
          title=""
        >
          <EditComments
            postComments={activePost}
            reloadPosts={async () => {
              await dispatch(postsActions.setPosts(await getDataList("/posts")));
            }}
          />
        </Popup>
      ) : null}
    </div>
  );
}

export default Spinner(AdminPosts);
