import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogsAlreadyExist: false,
  blogs: null,
};

const blogPostsSlice = createSlice({
  name: "reduxBlogPosts",
  initialState,
  reducers: {
    setBlogPosts: (state, action) => {
        state.blogsAlreadyExist = true
        state.blogs = action.payload;
    },
  },
});

export const {setBlogPosts} = blogPostsSlice.actions;

export default blogPostsSlice.reducer;