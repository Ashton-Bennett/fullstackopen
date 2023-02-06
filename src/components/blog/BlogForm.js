import useField from "../../hooks/useField";
import axios from "axios";
import { useSelector } from "react-redux";
import blogService from "../../services/blogs";
import { appendBlog, initializeBlogs } from "../../reducers/blogReducer";
import {
  displayMessage,
  removeMessage,
} from "../../reducers/notificationReducer";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";

import "/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/style.css";

const h2Style = {
  fontSize: "1.5rem",
  paddingBottom: ".5em",
};

const blogFormStyle = {
  color: "white",
  marginLeft: ".25em",
};

const BlogForm = ({ dispatch }) => {
  const user = useSelector((state) => state.user);
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("url");

  const addBlog = async (event) => {
    event.preventDefault();
    const usersInDataBase = "/api/users";
    const userinDB = await axios.get(usersInDataBase);
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      user: userinDB.data.filter((x) => x.name === user.name)[0].id,
      userFull: userinDB.data.filter((x) => x.name === user.name)[0],
    };
    const createdBlog = await blogService.create(blogObject);
    dispatch(appendBlog(createdBlog));
    resetTitle();
    resetAuthor();
    resetUrl();
    dispatch(
      displayMessage(
        "Notifi",
        `You added ${blogObject.title} by ${blogObject.author}`
      )
    );
    dispatch(removeMessage());
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs));
    });
  };

  return (
    <div>
      <h2 style={h2Style}>Enter Details:</h2>
      <form style={blogFormStyle} onSubmit={addBlog}>
        {" "}
        <InputGroup className="inputGroup">
          <InputLeftElement children="Title:" />

          <Input
            required
            style={blogFormStyle}
            {...title}
            size="md"
            variant="flushed"
            focusBorderColor="#9765E0"
          />
        </InputGroup>
        <InputGroup className="inputGroup">
          <InputLeftElement children="Author:" />
          <Input
            required
            style={blogFormStyle}
            {...author}
            size="md"
            variant="flushed"
            focusBorderColor="#9765E0"
          />
        </InputGroup>
        <InputGroup className="inputGroup">
          <InputLeftElement children="URL:" />
          <Input
            required
            style={blogFormStyle}
            {...url}
            size="md"
            variant="flushed"
            focusBorderColor="#9765E0"
          />
        </InputGroup>
        <Button
          type="submit"
          color="#9765E0"
          size="lg"
          variant="ghost"
          _hover={{ color: "white" }}
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
