import React from "react";

import "./adminCategory.style.scss";

const AdminCategory = props => {
  const { category, deleteCategory, editCategory } = props;
  const { name, id } = category;
  return (
    <div className="category-tab">
      <div className="item-name">
        <p>{name}</p>
      </div>
      <div className="item-action">
        <span onClick={() => {
          editCategory(id, name);
        }} className="material-icons">edit</span>
        <span onClick={() => {
          deleteCategory(id);
        }} className="material-icons">delete</span>
      </div>
    </div>
  );
};

export default AdminCategory;
