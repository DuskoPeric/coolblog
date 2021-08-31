import { createSelector } from "reselect";

const selectAllCategories = state => state.categories;

export const selectCategories = createSelector(
  [selectAllCategories],
  categories => categories.categories
);
export const isCategoriesLoaded = createSelector(
  [selectAllCategories],
  categories => categories.isLoaded
);
export const selectSpecificCategory = categoryId =>
  createSelector(
    [selectAllCategories],
    categories => {
      if (categories.categories.length > 0) {
        const selectCategory = categories.categories.find(
          category => category.id === categoryId
        );
        return selectCategory ? selectCategory.name : null;
      } else {
        return null;
      }
    }
  );
