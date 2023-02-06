import { useLocation } from "react-router-dom";
import computerIllastration from "/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/images/undraw_progressive_app_m-9-ms.svg";

const subheadingStyle = {
  fontSize: "2.5rem",
  fontWeight: "600",
  marginTop: "1em",
  color: "#9765E0",
};

const User = () => {
  const location = useLocation();
  const user = location.state;

  const bodyStyle = {
    backgroundColor: "#00C2BA",
    color: "black",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: user.blogs.length < 7 ? "none" : "space-between",
    fontSize: "2rem",
  };

  return (
    <div style={bodyStyle}>
      <h1 style={{ fontSize: "4rem", fontWeight: "700", marginTop: "1em" }}>
        {user.username}
      </h1>
      <img
        src={computerIllastration}
        alt="computer illastration"
        style={{ maxWidth: "250px", marginTop: ".5em" }}
      />
      <h3 style={subheadingStyle}>Added Blogs:</h3>
      <div style={{ marginTop: "1em" }}>
        {user.blogs.map((blog) => {
          return <p key={blog.title}>{blog.title}</p>;
        })}
      </div>
    </div>
  );
};

export default User;
