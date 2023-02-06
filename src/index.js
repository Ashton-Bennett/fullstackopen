import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogReducer";

blogService.getAll().then((blogs) => {
  store.dispatch(setBlogs(blogs));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
