import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.user
);

export const selectCurrentUserId = createSelector(
  [selectUser],
  user => user.user.id
);
