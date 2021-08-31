import React, { useState } from "react";

import "./filter.style.scss";

import { connect } from "react-redux";
import { isAuthorsLoaded } from "../../redux/authors/author.selectors";
import { isCategoriesLoaded } from "../../redux/categories/categories.selectors";

import Authors from "../authors/authors.component";
import Categories from "../categories/categories.component";

const SideFilter = (props) => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <aside className="left-filter">
      <Categories
        isLoaded={props.isCategoriesLoaded}
        selected={selectedItem}
        setSelected={item => setSelectedItem(item)}
      />
      <Authors
        isLoaded={props.isAuthorsLoaded}
        selected={selectedItem}
        setSelected={item => setSelectedItem(item)}
      />
    </aside>
  );
}

const mapStateToProps = state => ({
  isAuthorsLoaded: isAuthorsLoaded(state),
  isCategoriesLoaded: isCategoriesLoaded(state)
});

export default connect(mapStateToProps)(SideFilter);
