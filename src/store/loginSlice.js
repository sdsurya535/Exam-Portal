import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth";

export const loginSlice = createSlice({
  name: "log",
  initialState: { login: false, },
  reducers: {
    loggedIn: (state) => {
      return { ...state, login:authService.isLoggedIn() };
    },
    loggedOut:(state,action)=>{
        return {...state, login:action.payload.logout}
    }
  },
});

export const {loggedIn,loggedOut} = loginSlice.actions;