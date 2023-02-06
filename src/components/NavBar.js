import { Link } from "react-router-dom";
import { logOutUser } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";

const navBar = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#00C2BA",
  padding: "1em",
  color: "#2F2F31",
  fontSize: "1.2rem",
  fontWeight: 700,
  borderBottom: "2px solid #2F2F31",
};
const navBarItem = {
  paddingLeft: "1.2em",
};

const logOutButtonStyle = {
  backgroundColor: "#00C2BA",
  fontSize: "1.2rem",
  fontWeight: 700,
  marginLeft: "1em",
};

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!user) {
    return null;
  }

  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    window.location = "http://localhost:3000/login";
    return dispatch(logOutUser());
  };

  return (
    <>
      <div style={navBar}>
        <span
          style={{ color: "#9765E0", fontSize: "2rem" }}
          className="material-symbols-outlined"
        >
          draw
        </span>
        <div>
          <Link style={navBarItem} className="hoverToChangeToPurple" to="/">
            Blogs
          </Link>
          <Link
            style={navBarItem}
            className="hoverToChangeToPurple"
            to="/users"
          >
            Users
          </Link>
        </div>
        <div style={navBarItem}>
          {user.name} logged-in
          <Button
            onClick={logOut}
            type="submit"
            color="#9765E0"
            style={logOutButtonStyle}
            size="sm"
            _hover={{ color: "black", opacity: "80%" }}
          >
            log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
