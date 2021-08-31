import "./posts.types";
import postsTypes from "./posts.types";
const INITIAL_STATE = {
  posts: [],
  filterBy: "",
  filteredId: null,
  postsLoaded: false
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postsTypes.SET_POSTS:
      return { ...state, posts: action.payload, postsLoaded: true };
    case postsTypes.SET_FILTERID:
      return {
        ...state,
        filteredId: action.payload
      };
    case postsTypes.SET_FILTERBY:
      return {
        ...state,
        filterBy: action.payload
      };
    default:
      return state;
  }
};

export default postsReducer;
