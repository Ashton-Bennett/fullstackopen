import { useEffect } from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { initializeBlogs } from "../../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../style.css";
import Notification from "../Notification";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const bodyStyle = {
    backgroundColor: "#00C2BA",
    color: "#2F2F31",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const h1Style = {
    fontSize: "4rem",
    width: "200px",
    borderBottom: "solid",
    marginTop: "1em",
    fontWeight: "700",
  };

  const addBlogFormStyle = {
    display: "flex",
    justifyContent: "center",
    color: "#9765E0",
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div style={bodyStyle}>
      <h1 style={h1Style}>Blogs:</h1>
      <Notification />
      <div style={addBlogFormStyle}>
        <Togglable buttonLabel="Add Blog">
          <BlogForm dispatch={dispatch} />
        </Togglable>
      </div>

      <div>
        {blogs.map((blog) => (
          <Link
            key={blog.title}
            style={{ textDecoration: "none" }}
            state={blog}
            to={`/blogs/${blog.id}`}
          >
            <div key={blog.id} className="hoverToChangeToPurple blogStyle">
              {blog.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
