import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getDataList } from "../../services/Utils";

import { connect } from "react-redux";
import {
  selectCategories,
  isCategoriesLoaded
} from "../../redux/categories/categories.selectors";
import { setPosts } from "../../redux/posts/posts.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import PostForm from "../../components/postForm/postForm.component";
import { addPost } from "../../services/posts";


const AddPostPage = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    title: "",
    shortDescription: "",
    imgUrl: "",
    content: "",
    categoryId: props.categories[0].id
  })
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmitForm = async event => {
    event.preventDefault();

    for (const property in data) {
      if (data[property] === "" && property !== "imgUrl") {
        if (!emptyFields.includes(property)) {
          setEmptyFields(prevState => [...prevState, property]);
        }
      }
    }
    if (data.content !== '' && data.shortDescription !== '' && data.title !== '' && emptyFields.length === 0) {
      try {
        await addPost(data, props.author.id);
        props.setPosts(await getDataList("/posts"));
        history.push("/");
      } catch (error) {
        alert("error creating post " + error.message);
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

  return (
    <div className="add-post-page container">
      <h1>Write new post</h1>
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
        isDataLoaded={true}
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
)(AddPostPage);
