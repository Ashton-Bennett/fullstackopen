import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      const updatedAnecdote = { ...action.payload };
      return [...state, updatedAnecdote].sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return [...action.payload].sort((a, b) => b.votes - a.votes);
    },
    increaseVote(state, action) {
      let newStateArray = [...state];
      const updatedAnecdote = { ...action.payload };
      newStateArray = newStateArray.map((obj) =>
        obj.id === action.payload.id ? updatedAnecdote : obj
      );
      return newStateArray.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { appendAnecdote, setAnecdotes, increaseVote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVoteCount = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id);
    dispatch(increaseVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
