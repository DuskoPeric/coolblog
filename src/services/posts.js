import { firestore } from "../firebase/firebase.utils";

export const deletePost = async postId => {
  const postRef = await firestore.collection("posts").doc(postId);
  await postRef.delete();
};

export const getPost = async postId => {
  const postRef = await firestore.collection("posts").doc(postId);
  const snapshot = await postRef.get();
  let data = { ...snapshot.data(), id: snapshot.id };
  return data;
};

export const addPost = async (data, authorId) => {
  const postsRef = await firestore.collection("posts");
  await postsRef.add({
    ...data,
    commentsNo: 0,
    authorId: authorId,
    published: new Date()
  });
}

export const editPost = async (data, postId) => {
  const postsRef = await firestore.collection("posts").doc(postId);
  await postsRef.set(data, { merge: true });
}

export const deleteComment = async (post, commentId) => {
  const commentRef = await firestore
    .collection("posts")
    .doc(post)
    .collection("comments")
    .doc(commentId);
  await commentRef.delete();
}

export const addComment = async (postId, comment, author) => {
  const commentsRef = await firestore.collection(
    `posts/${postId}/comments`
  );

  await commentsRef.add({
    comment,
    authorId: author,
    time: new Date()
  })
}


// const getPostData = async () => {
//   const postRef = await firestore.doc(
//     `posts/${props.match.params.postId}`
//   );
//   postRef.onSnapshot(snapShot => {
//     setPost({ ...snapShot.data(), id: snapShot.id });
//     setIsLoadedPost(true);
//   });
// };