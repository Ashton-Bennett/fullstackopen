import { useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../reducers/blogReducer";
import blogService from "/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/services/blogs.js";
import { useLocation } from "react-router-dom";
import CommentForm from "./CommentForm";
import "../../style.css";
import { Button } from "@chakra-ui/react";
import Illastration from "./Illastration";

const bodyStyle = {
  backgroundColor: "#00C2BA",
  color: "#2F2F31",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

const h1Style = {
  fontSize: "3rem",
  fontWeight: "700",
  textAlign: "center",
  marginTop: "1em",
};

const herosection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "700px",
  marginBottom: "1em",
};

const commentSectionStyle = {
  backgroundColor: "#534FA5",
  color: "white",
  width: "100%",
  height: "95vh",
  borderTop: "2px solid black",
};

const commentsHeaderStyle = {
  fontSize: "3rem",
  fontWeight: "700",
  marginTop: "1em",
  textAlign: "center",
  marginBottom: "1em",
};

const commentListStyle = {
  display: "flex",
  flexDirection: "column",
  justifyItems: "flex-start",
  alignItems: "center",
};

const Blog = () => {
  const location = useLocation();
  const blog = location.state;
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  const blogs = useSelector((state) => state.blogs);
  const currentToken = window.localStorage.getItem("loggedNoteappUser");
  const dispatch = useDispatch();
  const [blogComments, setBlogComments] = useState(blog.comments);

  const likeBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      user: blog.user.id,
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    return blogService
      .update(blog.id, blogObject)
      .then(setBlogLikes(blogObject.likes));
  };

  const removeBlog = async (event) => {
    event.preventDefault();

    if (window.confirm("Do you really want to delete this blog?")) {
      await blogService.deleteBlog(
        blog.id,
        JSON.parse(currentToken).token,
        blog.user.id
      );
      dispatch(
        deleteBlog(blogs.filter((bloginArray) => bloginArray.id !== blog.id))
      );
      window.location = "http://localhost:3000/";
    }
  };

  return (
    <div style={bodyStyle}>
      <div style={{ textAlign: "center", height: "80vh" }}>
        <div style={herosection}>
          <h1 style={h1Style}>{blog.title} </h1>
          <h2 style={{ marginBottom: "1em" }}>by {blog.author}</h2>
          <Illastration />
          <a
            className=" anchorText hoverToChangeToPurple"
            href={`${blog.url}`}
            target="_blank"
            style={{ fontSize: "1rem" }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                marginRight: ".5em",
                marginTop: "2em",
                color: "#9765E0",
              }}
            >
              share
            </span>
            {blog.url}
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: ".5em", color: "#9765E0" }}
            >
              share
            </span>
          </a>
        </div>
        <div>
          {blogLikes}{" "}
          <Button
            variant="ghost"
            color="#9765E0"
            onClick={likeBlog}
            size="xs"
            ml={1}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
            >
              thumb_up
            </span>
          </Button>
        </div>

        <div>Added by {blog.user.name}</div>
        <div>
          {JSON.parse(currentToken).name === blog.user.name && (
            <Button
              variant="ghost"
              color="#9765E0"
              onClick={removeBlog}
              size="md"
              ml={1}
            >
              delete
            </Button>
          )}
        </div>
      </div>
      <div style={commentSectionStyle}>
        <h2 style={commentsHeaderStyle}>Comments:</h2>
        <div style={commentListStyle}>
          {blogComments.length > 0 &&
            blogComments.map((comment) => (
              <li key={comment.id + comment.content}>{comment.content}</li>
            ))}
          <CommentForm
            blogId={blog.id}
            blogComments={blogComments}
            setBlogComments={setBlogComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
