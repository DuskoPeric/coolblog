import React from "react";

import "./postForm.style.scss";

import Input from "../input/input.component";
import Button from "../button/button.component";
import Wysiwyg from "../wysiwyg/wysiwyg.component";
import Select from "../select/select.component";

const PostForm = props => {
  return (
    <form onSubmit={props.submitForm} className="addpost-form">
      <Select
        name="categoryId"
        selectId="categoryId"
        value={props.category}
        handleSelect={props.changeValue}
        labelText="Choose a category:"
        options={props.selectOptions}
      />

      <Input
        additionalClasses="short"
        type="text"
        name="title"
        placeholder="Title"
        changeEvent={props.changeValue}
        changeBlur={props.changeBlur}
        value={props.data.title}
      />
      {props.notValid.includes("title") ? (
        <p className="required">Title is required</p>
      ) : null}

      <Input
        type="text"
        name="shortDescription"
        placeholder="Short description"
        changeEvent={props.changeValue}
        changeBlur={props.changeBlur}
        value={props.data.shortDescription}
      />
      {props.notValid.includes("shortDescription") ? (
        <p className="required">Short description is required</p>
      ) : null}
      <h3>Content</h3>
      {props.notValid.includes("content") ? (
        <p className="required">Content is required</p>
      ) : null}
      {props.isDataLoaded ? (
        <Wysiwyg
          content={props.content}
          setContent={markup => {
            props.handleContent(markup);
          }}
          changeBlur={isEmpty => {
            props.checkContent(isEmpty);
          }}
        />
      ) : null}

      <Input
        type="text"
        name="imgUrl"
        placeholder="Image URL"
        changeEvent={props.changeValue}
        value={props.data.imgUrl}
      />
      <Button type="submit" additionalClasses='margintop20'>Publish</Button>
    </form>
  );
};

export default PostForm;
