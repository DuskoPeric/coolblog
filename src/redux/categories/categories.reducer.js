import categoriesTypes from "./categories.types";
const INITIAL_STATE = {
  categories: [],
  isLoaded: false
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoriesTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload, isLoaded: true };

    default:
      return state;
  }
};

export default categoriesReducer;
