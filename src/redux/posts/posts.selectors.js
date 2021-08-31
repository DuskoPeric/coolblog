import { createSelector } from "reselect";

const selectPosts = state => state.posts;

export const selectCurrentPosts = createSelector(
  [selectPosts],
  posts => posts.posts
);
export const selectedFilterId = createSelector(
  [selectPosts],
  posts => posts.filteredId
);
export const selectFilterBy = createSelector(
  [selectPosts],
  posts => posts.filterBy
);
export const selectFilteredPosts = (id, filterBy) =>
  createSelector(
    [selectPosts],
    posts => {
      if (filterBy === "author") {
        return posts.posts.filter(post => post.authorId === id);
      } else if (filterBy === "category") {
        return posts.posts.filter(post => post.categoryId === id);
      } else {
        return posts.posts;
      }
    }
  );
export const selectLikedPosts = liked => {
  return createSelector(
    [selectPosts],
    posts => {
      return posts.posts.filter(post => {
        if (liked) {
          let isLiked = false;
          for (let i = 0; i < liked.length; i++) {
            if (post.id === liked[i]) {
              isLiked = true;
            }
          }
          return isLiked ? post : null;
        }
        return [];
      });
    }
  );
};
