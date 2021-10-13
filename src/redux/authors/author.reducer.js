import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  authors: [],
  isLoaded: false
};

const authorsSlice=createSlice({
  name:'authors',
  initialState:INITIAL_STATE,
  reducers:{
    setAuthors(state,action){
      return { ...state, authors: action.payload, isLoaded: true };
    }
  }
})

const authorsReducer=authorsSlice.reducer;
export const authorsActions=authorsSlice.actions;

export default authorsReducer;