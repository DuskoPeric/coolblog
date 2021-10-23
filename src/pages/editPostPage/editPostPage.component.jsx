import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { firestore } from "../../firebase/firebase.utils";
import { getDataList } from "../../services/Utils";

import {  useSelector,useDispatch } from "react-redux";
import {
  selectCategories,
  isCategoriesLoaded
} from "../../redux/categories/categories.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import PostForm from "../../components/postForm/postForm.component";
import { editPost } from "../../services/posts";
import { postsActions } from "../../redux/posts/posts.reducer";


const EditPostPage = (props) => {
  const dispatch=useDispatch();
  const author=useSelector(state =>selectCurrentUser(state))
  const areCategoriesLoaded=useSelector(state =>isCategoriesLoaded(state))
  const [sending,setSending]=useState(false);
  const categories=useSelector(state =>selectCategories(state))
  const [data, setData] = useState({
    title: "",
    shortDescription: "",
    imgUrl: "",
    content: "",
    categoryId: ""
  })
  const [emptyFields, setEmptyFields] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getPost = async () => {
    const postRef = await firestore.doc(
      `posts/${props.match.params.postId}`
    );
    postRef.onSnapshot(snapShot => {
      setData({ ...snapShot.data(), id: snapShot.id })
      setIsDataLoaded(true)
    });
  };

  useEffect(() => {
    getPost();
  }, [])

  const handleSubmitForm = async event => {
    event.preventDefault();
    for (const property in data) {
      if (data[property] === "" && property !== "imgUrl") {
        if (!emptyFields.includes(property)) {
          setEmptyFields(prevState => [...prevState, property]);
        }
      }
    }
    if (emptyFields.length === 0) {
      setSending(true)
      console.log('opa')
      try {
        await editPost(data, props.match.params.postId)
        dispatch(postsActions.setPosts(await getDataList("/posts")));
        props.history.push("/");
      } catch (error) {
        alert("error edit post " + error.message);
      }
    }
  };
  const handleChange = async event => {
    const { name, value } = event.target;
    await setData(prevState => { return { ...prevState, [name]: value } })
  };
  const handleBlur = event => {
    const { name, value } = event.target;
    if (value === "") {
      if (!emptyFields.includes(name)) {
        setEmptyFields(prevState => [...prevState, name])
      }
    } else {
      setEmptyFields(prevState => prevState.filter(item => item !== name));
    }
  };
  const checkContent = isEmpty => {
    if (isEmpty) {
      if (!emptyFields.includes("content")) {
        setEmptyFields(prevState => [...prevState, "content"])
      }
    } else {
      setEmptyFields(prevState => prevState.filter(item => item !== "content"));
    }
  };
  const handleContent = markup => {
    setData(prevState => { return { ...prevState, content: markup } })
  };

  if (data.authorId !== undefined) {
    if (author === null) {
      return <Redirect to="/" />;
    }
    if (author.id !== data.authorId) {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className="add-post-page container">
      <h1>Edit post</h1>
      <PostForm
        submitForm={handleSubmitForm}
        changeValue={handleChange}
        changeBlur={handleBlur}
        checkContent={checkContent}
        content={data.content}
        category={data.categoryId}
        selectOptions={categories}
        notValid={emptyFields}
        data={data}
        isSending={sending}
        isDataLoaded={isDataLoaded}
        handleContent={markup => {
          handleContent(markup);
        }}
      />
    </div>
  );

}

export default EditPostPage;
