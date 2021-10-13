import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  categories: [],
  isLoaded: false
};

const categoriesSlice=createSlice({
  name:'categories',
  initialState:INITIAL_STATE,
  reducers:{
    setCategories(state,action){
      return { ...state, categories: action.payload, isLoaded: true };
    }
  }
})

const categoriesReducer=categoriesSlice.reducer;
export const categoriesActions=categoriesSlice.actions;

export default categoriesReducer;