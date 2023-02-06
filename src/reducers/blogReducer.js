import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      const updatedBlog = { ...action.payload };
      return [...state, updatedBlog];
    },
    setBlogs(state, action) {
      return [...action.payload];
    },
    increaseLikes(state, action) {
      let newStateArray = [...state];
      const updatedBlog = { ...action.payload };
      newStateArray = newStateArray.map((obj) =>
        obj.id === action.payload.id ? updatedAnecdote : obj
      );
      return newStateArray;
    },
  },
});

export const { appendBlog, setBlogs, increaseLikes } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const increaseVoteCount = (id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id);
    dispatch(increaseLikes(updatedBlog));
  };
};

export const deleteBlog = (something) => {
  return async (dispatch) => {
    dispatch(setBlogs(something));
  };
};

export default blogsSlice.reducer;
