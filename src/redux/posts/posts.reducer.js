import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = {
  posts: [],
  filterBy: "",
  filteredId: null,
  postsLoaded: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
  reducers: {
    setPosts(state, action) {
      return { ...state, posts: action.payload, postsLoaded: true };
    },
    setFilteredId(state, action) {
      return {
        ...state,
        filteredId: action.payload
      };
    },
    setFiltereBy(state, action) {
      return {
        ...state,
        filterBy: action.payload
      };
    }
  }
})


const postsReducer=postsSlice.reducer;
export const postsActions=postsSlice.actions;

export default postsReducer;
