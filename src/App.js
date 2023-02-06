import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/blog/BlogList";
import Blog from "./components/blog/Blog";
import Users from "./components/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import NavBar from "./components/NavBar";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { loggedInUser } from "./reducers/userReducer";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loggedInUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
