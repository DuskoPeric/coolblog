import React, { useState, useEffect } from "react";

import "./categories.style.scss";

import { connect } from "react-redux";
import { selectCategories } from "../../redux/categories/categories.selectors";
import { setFilteredId, setFiltereBy } from "../../redux/posts/posts.actions";

import SpinnerFilter from "../spinner/spinnerFilter.component";

const Categories = (props) => {

  const {
    categories,
    filterByCategory,
    filterBy,
    setSelected,
    selected
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      filterByCategory(null);
      filterBy("");
      setSelected("");
    }
  }, []);

  return (
    <div className="categories">
      <h3 className={open ? 'open' : null} onClick={() => setOpen(!open)}>Categories {!open ? <span className="material-icons">arrow_drop_down</span> : <span className="material-icons">arrow_drop_up</span>}</h3>
      {open && <ul>
        <li
          onClick={() => {
            filterByCategory(null);
            filterBy("");
            setSelected("");
          }}
        >
          ALL
          </li>
        {categories.map(category => {
          return (
            <li
              key={category.id}
              className={selected === category.id ? "selected" : ""}
              onClick={() => {
                filterByCategory(category.id);
                filterBy("category");
                setSelected(category.id);
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>}
    </div>
  );

}
const mapStateToProps = state => ({
  categories: selectCategories(state)
});

const mapDispatchToProps = dispatch => {
  return {
    filterByCategory: id => dispatch(setFilteredId(id)),
    filterBy: by => dispatch(setFiltereBy(by))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpinnerFilter(Categories));
