import React, { useState } from "react";

import "./authors.style.scss";

import { connect } from "react-redux";
import { selectAuthors } from "../../redux/authors/author.selectors";
import { setFilteredId, setFiltereBy } from "../../redux/posts/posts.actions";

import SpinnerFilter from "../spinner/spinnerFilter.component";

const Authors = (props) => {
  const {
    authors,
    filterByAuthor,
    filterBy,
    selected,
    setSelected
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="authors">
      <h3 onClick={() => setOpen(!open)}>Authors {!open ? <span className="material-icons">arrow_drop_down</span> : <span className="material-icons">arrow_drop_up</span>}</h3>
      {open && <ul>
        <li
          onClick={() => {
            filterByAuthor(null);
            filterBy("");
            setSelected("");
          }}
        >
          ALL
          </li>
        {authors.map(author => {
          return (
            <li
              className={selected === author.id ? "selected" : ""}
              onClick={() => {
                filterByAuthor(author.id);
                filterBy("author");
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

const mapStateToProps = state => ({
  authors: selectAuthors(state)
});

const mapDispatchToProps = dispatch => {
  return {
    filterByAuthor: id => dispatch(setFilteredId(id)),
    filterBy: by => dispatch(setFiltereBy(by))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpinnerFilter(Authors));
