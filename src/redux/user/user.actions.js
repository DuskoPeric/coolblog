import userTypes from "./user.types";
export const setUser = user => {
  return {
    type: userTypes.SET_USER,
    payload: user
  };
};
