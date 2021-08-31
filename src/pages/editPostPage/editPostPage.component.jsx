import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { firestore } from "../../firebase/firebase.utils";
import { getDataList } from "../../services/Utils";

import { connect } from "react-redux";
import {
  selectCategories,
  isCategoriesLoaded
} from "../../redux/categories/categories.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setPosts } from "../../redux/posts/posts.actions";

import PostForm from "../../components/postForm/postForm.component";
import { editPost } from "../../services/posts";


const EditPostPage = (props) => {

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
      try {
        await editPost(data, props.match.params.postId)
        props.setPosts(await getDataList("/posts"));
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
    if (props.author === null) {
      return <Redirect to="/" />;
    }
    if (props.author.id !== data.authorId) {
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
        selectOptions={props.categories}
        notValid={emptyFields}
        data={data}
        isDataLoaded={isDataLoaded}
        handleContent={markup => {
          handleContent(markup);
        }}
      />
    </div>
  );

}
const mapStateToProps = state => ({
  categories: selectCategories(state),
  areCategoriesLoaded: isCategoriesLoaded(state),
  author: selectCurrentUser(state)
});
const mapDispatchToProps = dispatch => ({
  setPosts: posts => dispatch(setPosts(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostPage);
