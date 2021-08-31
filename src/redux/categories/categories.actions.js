import categoriesTypes from "./categories.types";

export const setCategories = categories => {
  return {
    type: categoriesTypes.SET_CATEGORIES,
    payload: categories
  };
};
