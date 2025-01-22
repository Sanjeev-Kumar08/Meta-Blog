"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        forgotPassword: forgotPasswordSlice
    }
})

export default store;