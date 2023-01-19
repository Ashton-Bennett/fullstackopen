import { connect } from "react-redux";
const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {props.notification.length !== 0 && (
        <div style={style}>{props.notification}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
