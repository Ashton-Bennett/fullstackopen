import { useSelector, useDispatch } from "react-redux";
import { increaseVoteCount } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterInput = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdoteObj = anecdotes.filter((anecdote) => anecdote.id === id);
    const updatedVotes = anecdoteObj[0].votes + 1;
    const updatedCount = { ...anecdoteObj[0], votes: updatedVotes };
    dispatch(increaseVoteCount(updatedCount));
    dispatch(setNotification(`You voted: '${updatedCount.content}'`, 3));
  };
  return (
    <>
      <Notification />
      <br></br>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterInput)
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>votes</button>
            </div>
            <br></br>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
