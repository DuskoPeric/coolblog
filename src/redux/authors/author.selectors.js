import { createSelector } from "reselect";

const selectAllAuthors = state => state.authors;

export const selectAuthors = createSelector(
  [selectAllAuthors],
  authors => authors.authors
);

export const isAuthorsLoaded = createSelector(
  [selectAllAuthors],
  authors => authors.isLoaded
);
export const selectSpecificAuthors = authorId =>
  createSelector(
    [selectAllAuthors],
    authors => {
      if (authors.authors.length > 0) {
        const selectAuthor = authors.authors.find(
          author => author.id === authorId
        );
        return selectAuthor ? selectAuthor.displayName : null;
      } else {
        return null;
      }
    }
  );
