import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

const updateVotes = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVotes };
