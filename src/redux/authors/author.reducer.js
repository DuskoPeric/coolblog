import authorsTypes from "./authors.types";
const INITIAL_STATE = {
  authors: [],
  isLoaded: false
};

const authorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authorsTypes.SET_AUTHORS:
      return { ...state, authors: action.payload, isLoaded: true };
    default:
      return state;
  }
};

export default authorsReducer;
