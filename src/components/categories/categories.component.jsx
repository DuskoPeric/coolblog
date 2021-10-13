import React, { useState, useEffect } from "react";

import "./categories.style.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../redux/categories/categories.selectors";

import SpinnerFilter from "../spinner/spinnerFilter.component";
import { postsActions } from "../../redux/posts/posts.reducer";

const Categories = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => selectCategories(state))

  const {
    filterByCategory,
    filterBy,
    setSelected,
    selected
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(postsActions.setFiltereBy(""));
      dispatch(postsActions.setFilteredId(null));
      setSelected("");
    }
  }, []);

  return (
    <div className="categories">
      <h3 className={open ? 'open' : null} onClick={() => setOpen(!open)}>Categories {!open ? <span className="material-icons">arrow_drop_down</span> : <span className="material-icons">arrow_drop_up</span>}</h3>
      {open && <ul>
        <li
          onClick={() => {
            dispatch(postsActions.setFiltereBy(""));
            dispatch(postsActions.setFilteredId(null));
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
                dispatch(postsActions.setFiltereBy("category"));
                dispatch(postsActions.setFilteredId(category.id));
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

export default SpinnerFilter(Categories);
