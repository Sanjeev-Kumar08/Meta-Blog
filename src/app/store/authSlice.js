import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    status: false,
    userData : null,
    // token: localStorage.getItem("authToken") || null,
    token: Cookies.get('authToken') || null
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
            state.userData = userFound;
            // localStorage.setItem("authToken", JSON.stringify(token));
            Cookies.set('authToken', JSON.stringify(token))
        },
        //logOut
        logOut : (state) => {
            state.status = false,
            state.userData = null,
            state.token = null;
            Cookies.remove('authToken');
            // localStorage.removeItem("authToken");
        }
    }
})

export const {logIn, logOut} = authSlice.actions;

export default authSlice.reducer;