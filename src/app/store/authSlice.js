import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    status: false,
    userData : null,
    token: Cookies.get('authToken') || null,
    session: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Login
        logIn : (state, action) => {
            state.status = true;
            state.session = true;
            const { token, userFound } = action.payload;
            state.token = token;
            state.userData = userFound;
            Cookies.set('authToken', JSON.stringify(token))
        },
        //logOut
        logOut : (state) => {
            state.status = false,
            state.session = false;
            state.userData = null,
            state.token = null;
            Cookies.remove('authToken');
        }
    }
})

export const {logIn, logOut} = authSlice.actions;

export default authSlice.reducer;