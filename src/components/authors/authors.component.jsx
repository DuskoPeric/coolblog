import React, { useState } from "react";

import "./authors.style.scss";

import { useSelector,useDispatch } from "react-redux";
import { selectAuthors } from "../../redux/authors/author.selectors";

import SpinnerFilter from "../spinner/spinnerFilter.component";
import { postsActions } from "../../redux/posts/posts.reducer";

const Authors = (props) => {
  const dispatch=useDispatch();
  const authors=useSelector(state=>selectAuthors(state))
  const {
    selected,
    setSelected
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="authors">
      <h3 onClick={() => setOpen(!open)}>Authors {!open ? <span className="material-icons">arrow_drop_down</span> : <span className="material-icons">arrow_drop_up</span>}</h3>
      {open && <ul>
        <li
          className={selected === "all" ? "selected" : ""}
          onClick={() => {
            dispatch(postsActions.setFilteredId(null));
            dispatch(postsActions.setFiltereBy(""));
            setSelected("all");
          }}
        >
          ALL
          </li>
        {authors.map(author => {
          return (
            <li
              className={selected === author.id ? "selected" : ""}
              onClick={() => {
                dispatch(postsActions.setFilteredId(author.id));
                dispatch(postsActions.setFiltereBy("author"));
                setSelected(author.id);
              }}
              key={author.id}
            >
              {author.displayName}
            </li>
          );
        })}
      </ul>}
    </div>
  );
}

export default SpinnerFilter(Authors);
