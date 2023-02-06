import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onresethandler = () => {
    setValue("");
  };

  return [{ type, value, onChange }, onresethandler];
};

export default useField;
