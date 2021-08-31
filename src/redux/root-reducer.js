import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import authorsReducer from "./authors/author.reducer";
import categoriesReducer from "./categories/categories.reducer";
import postsReducer from "./posts/posts.reducer";

export default combineReducers({
  user: userReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
  posts: postsReducer
});
