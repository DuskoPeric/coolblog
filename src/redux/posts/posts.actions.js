import postsTypes from "./posts.types";
export const setPosts = posts => {
  return {
    type: postsTypes.SET_POSTS,
    payload: posts
  };
};
export const setFilteredId = id => {
  return {
    type: postsTypes.SET_FILTERID,
    payload: id
  };
};
export const setFiltereBy = filterBy => {
  return {
    type: postsTypes.SET_FILTERBY,
    payload: filterBy
  };
};

