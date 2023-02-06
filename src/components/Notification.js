import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  return (
    <>
      {message !== null && (
        <div style={message.displayStyle}>{message.message}</div>
      )}
    </>
  );
};

export default Notification;
