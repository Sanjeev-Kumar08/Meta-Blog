"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";
import blogPostsSlice from "./blogPostsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        forgotPassword: forgotPasswordSlice,
        reduxBlogPosts: blogPostsSlice
    }
})

export default store;