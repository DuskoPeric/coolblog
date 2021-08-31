import React, { useState } from "react";

import "./adminCategories.style.scss";

import { deletePost } from "../../services/posts";
import {
  updateCategory,
  addCategory,
  deleteCategory
} from "../../services/categories";
import { getDataList } from "../../services/Utils";

import { connect } from "react-redux";
import { selectCategories } from "../../redux/categories/categories.selectors";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { setPosts } from "../../redux/posts/posts.actions";
import { setCategories } from "../../redux/categories/categories.actions";

import AdminCategory from "../adminCategory/adminCategory.component";
import Popup from "../popup/popup.component";
import DeleteItem from "../deleteItem/deleteItem.component";
import Button from "../button/button.component";
import EditItem from "../editItem/editItem.component";

const AdminCategories = (props) => {

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [isOpenEditPopup, setIsOpenEditPopup] = useState(false);
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [activeCategoryName, setActiveCategoryName] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const deleteSelectedCategory = async () => {
    for (let i = 0; i < props.posts.length; i++) {
      if (props.posts[i].categoryId === activeCategory) {
        deletePost(props.posts[i].id);
      }
    }
    deleteCategory(activeCategory);
    await props.setPosts(await getDataList("/posts"));
    await props.setCategories(await getDataList("/categories"));
    setIsOpenDeletePopup(false)
  };

  const editCategory = async name => {
    await updateCategory(activeCategory, name);
    props.setCategories(await getDataList("/categories"));
    setIsOpenEditPopup(false)
  };

  const addNewCategory = async name => {
    await addCategory(name);
    props.setCategories(await getDataList("/categories"));
    setIsOpenAddPopup(false)
  };

  const { categories } = props;

  return (
    <div>
      <div className="admin-categories-table">
        <div className="head-tab">
          <div className="head-name">Category</div>
          <div className="head-role">Action</div>
        </div>
        {categories.map(category => (
          <AdminCategory
            key={category.id}
            category={category}
            deleteCategory={id => {
              setIsOpenDeletePopup(true);
              setActiveCategory(id);
            }
            }
            editCategory={(id, name) => {
              setIsOpenEditPopup(true);
              setActiveCategory(id);
              setActiveCategoryName(name)
            }
            }
          />
        ))}
      </div>
      <Button onClick={() => setIsOpenAddPopup(true)}>
        Add new
        </Button>
      {isOpenDeletePopup ? (
        <Popup closePopup={() => setIsOpenDeletePopup(false)}>
          <DeleteItem
            title="Do you really want to delete this category?"
            submitChange={deleteSelectedCategory}
            closePopup={() => setIsOpenDeletePopup(false)}
          />
        </Popup>
      ) : null}
      {isOpenEditPopup ? (
        <Popup closePopup={() => setIsOpenEditPopup(false)}>
          <EditItem
            title={`Edit ${activeCategoryName} category`}
            name={activeCategoryName}
            closePopup={() => setIsOpenEditPopup(false)}
            submitChange={name => editCategory(name)}
          />
        </Popup>
      ) : null}
      {isOpenAddPopup ? (
        <Popup closePopup={() => setIsOpenAddPopup(false)}>
          <EditItem
            title="Add new category"
            name=""
            closePopup={() => setIsOpenAddPopup(false)}
            submitChange={name => addNewCategory(name)}
          />
        </Popup>
      ) : null}
    </div>
  );
}
const mapStateToProps = state => ({
  categories: selectCategories(state),
  posts: selectCurrentPosts(state)
});

const mapDispatchToProps = dispatch => ({
  setPosts: posts => dispatch(setPosts(posts)),
  setCategories: categories => dispatch(setCategories(categories))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCategories);
