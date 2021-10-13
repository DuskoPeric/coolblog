import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  user: null
};

const userSlice=createSlice({
  name:'user',
  initialState:INITIAL_STATE,
  reducers:{
    setUser(state,action){
      return { ...state, user: action.payload };
    }
  }
})

const userReducer=userSlice.reducer;
export const userActions=userSlice.actions;

export default userReducer;
