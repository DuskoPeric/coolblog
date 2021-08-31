import authorsTypes from "./authors.types";

export const setAuthors = authors => {
  return {
    type: authorsTypes.SET_AUTHORS,
    payload: authors
  };
};
