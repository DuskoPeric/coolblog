import React, { useState } from "react";

import "./filter.style.scss";

import { useSelector } from "react-redux";
import { isAuthorsLoaded } from "../../redux/authors/author.selectors";
import { isCategoriesLoaded } from "../../redux/categories/categories.selectors";

import Authors from "../authors/authors.component";
import Categories from "../categories/categories.component";

const SideFilter = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const checkisAuthorsLoaded=useSelector(state=>isAuthorsLoaded(state))
  const checkisCategoriesLoaded=useSelector(state=>isCategoriesLoaded(state))

  return (
    <aside className="left-filter">
      <Categories
        isLoaded={checkisCategoriesLoaded}
        selected={selectedItem}
        setSelected={item => setSelectedItem(item)}
      />
      <Authors
        isLoaded={checkisAuthorsLoaded}
        selected={selectedItem}
        setSelected={item => setSelectedItem(item)}
      />
    </aside>
  );
}

export default SideFilter;
