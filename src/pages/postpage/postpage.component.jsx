import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  getAllComments,
  updateNumberOfComments
} from "../../services/getComments";

import PostContent from "../../components/postContent/postContent.component";
import { firestore } from "../../firebase/firebase.utils";


const PostPage = (props) => {

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadedPost, setIsLoadedPost] = useState(false);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const history = useHistory();

  let _isMounted = false;

  const getPostData = async () => {
    const postRef = await firestore.doc(
      `posts/${props.match.params.postId}`
    );

    postRef.onSnapshot(snapShot => {
      if (snapShot.data()) {
        setPost({ ...snapShot.data(), id: snapShot.id });
        setIsLoadedPost(true);
      } else {
        history.push("/");
       
      }
    });
  };

  const getComments = async () => {
    const allComments = await getAllComments(props.match.params.postId);
    setComments(allComments);
    setIsLoadedComments(true);
  };

  useEffect(() => {
    _isMounted = true;
    getPostData();
    getComments();
    return () => {
      _isMounted = false
    };
  }, []);
return(
  <PostContent
  isLoaded={isLoadedPost && isLoadedComments && post}
  post={post}
  comments={comments}
  onChangeComment={() => {
    getPostData();
    getComments();
    updateNumberOfComments(
      post.commentsNo,
      props.match.params.postId,
      true
    );
  }}
/>
)

}

export default PostPage;
