"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData : null,
    token: localStorage.getItem("authToken") || null,
    // expiryTime: localStorage.getItem("expiryTime") || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Login
        logIn : (state, action) => {
            state.status = true;
            const { token, userFound } = action.payload;
            state.token = token;
            // state.expiryTime = expiryTime;
            state.userData = userFound;

            // const expiryTime = Date.now() + data.expiresIn * 1000; 
            localStorage.setItem("authToken", JSON.stringify(token));
            // localStorage.setItem("expiryTime", JSON.stringify(expiryTime)); 
        },
        //logOut
        logOut : (state , action) => {
            state.status = false,
            state.userData = null,
            state.token = null;
            // state.expiryTime = null;

            // Clear localStorage
            localStorage.removeItem("authToken");
            // localStorage.removeItem("expiryTime");
        }
    }
})

export const {logIn, logOut} = authSlice.actions;

export default authSlice.reducer;