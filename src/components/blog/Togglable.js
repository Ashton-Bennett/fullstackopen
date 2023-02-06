import { useState } from "react";
import { Button } from "@chakra-ui/react";
const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          type="submit"
          color="#9765E0"
          size="lg"
          variant="ghost"
          _hover={{ color: "white" }}
          onClick={toggleVisibility}
        >
          {" "}
          <div className="material-symbols-outlined">add</div>
          <p>{props.buttonLabel}</p>
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          color="#9765E0"
          size="lg"
          variant="ghost"
          _hover={{ color: "white" }}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
