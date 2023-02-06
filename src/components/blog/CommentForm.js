import useField from "../../hooks/useField";
import blogService from "../../services/blogs";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";

const commentFieldStyle = {
  display: "flex",
  color: "white",
  marginTop: "2em",
  marginBottom: "2em",
  minWidth: "300px",
};

const CommentForm = ({ blogId, blogComments, setBlogComments }) => {
  const [comment, resetComment] = useField("text");

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    const newCommentToAdd = { content: comment.value, id: blogId };
    await blogService.updateComments(blogId, newCommentToAdd);
    setBlogComments([...blogComments, newCommentToAdd]);
    resetComment("");
  };

  return (
    <form onSubmit={commentSubmitHandler}>
      <div style={commentFieldStyle}>
        <InputGroup className="inputGroupBlack">
          <InputLeftElement children="New:" />
          <Input
            required
            {...comment}
            size="lg"
            variant="flushed"
            focusBorderColor="black"
            color="black"
          />
        </InputGroup>
        <Button variant="ghost" color="#9765E0" type="submit" size="xs" ml={2}>
          {" "}
          <span className="material-symbols-outlined">add_notes</span>
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
