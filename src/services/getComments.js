import { firestore } from "../firebase/firebase.utils";

export const getAllComments = async postId => {
  const commentsRef = await firestore.collection(`posts/${postId}/comments`);
  const snapshot = await commentsRef.get();
  let comments = [];
  snapshot.forEach(doc => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  const sortedComments = comments.sort(function(a, b) {
    return new Date(b.time.seconds * 1000) - new Date(a.time.seconds * 1000);
  });
  return sortedComments;
};
export const updateNumberOfComments = async (commentsNumber, post, add) => {
  const postRef = await firestore.collection("posts").doc(post);
  if (add) {
    postRef.set(
      {
        commentsNo: commentsNumber + 1
      },
      { merge: true }
    );
  } else {
    postRef.set(
      {
        commentsNo: commentsNumber - 1
      },
      { merge: true }
    );
  }
};
