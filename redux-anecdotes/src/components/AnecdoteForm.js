import { asObject, createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteToAdd = asObject(event.target.anecdote.value);
    event.target.anecdote.value = "";
    props.createNewAnecdote(anecdoteToAdd);
    props.setNotification(`New anecdote: '${anecdoteToAdd.content}'`, 5);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createNewAnecdote,
  setNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
