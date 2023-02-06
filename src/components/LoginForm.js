import { useDispatch } from "react-redux";
import { useState } from "react";
import { displayMessage, removeMessage } from "../reducers/notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { loggedInUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Notification from "./Notification";
import "../style.css";
import { Input, InputGroup, Button } from "@chakra-ui/react";

const bodyStyle = {
  backgroundColor: "#00C2BA",
  color: "white",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const h1Style = {
  fontSize: "4rem",
  marginBottom: "2em",
};
const textStyle = {
  fontSize: "1.2rem",
};
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      await dispatch(loggedInUser(user));
      navigate("/");
      setUsername("");
      setPassword("");
      dispatch(displayMessage("success", `Logged in as ${user.name}`));
      dispatch(removeMessage());
    } catch (exception) {
      dispatch(displayMessage("error", "Invalid username or password"));
      dispatch(removeMessage());
    }
  };

  return (
    <div style={bodyStyle}>
      <div>
        <h1 style={h1Style}>Please login</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <InputGroup className="inputGroup" flexDir="column">
            <p style={textStyle}>username:</p>
            <Input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              size="lg"
              variant="flushed"
              focusBorderColor="#9765E0"
              mb="2em"
              _autofill={{ backgroundColor: "none" }}
              className="userNameLogin"
            />
          </InputGroup>
          <InputGroup className="inputGroup" flexDir="column">
            <p style={textStyle}>password:</p>

            <Input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              size="lg"
              variant="flushed"
              focusBorderColor="#9765E0"
            />
          </InputGroup>

          <Button
            rightIcon={<ArrowForwardIcon />}
            type="submit"
            color="#9765E0"
            size="lg"
            variant="ghost"
            _hover={{ color: "white" }}
          >
            login
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
