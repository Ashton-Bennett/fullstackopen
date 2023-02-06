import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const updateComments = async (id, commentObj) => {
  const request = await axios.put(`${baseUrl}/${id}/comments`, commentObj);
  return request;
};

const deleteBlog = (id, token, userId) => {
  const request = axios.delete(`${baseUrl}/${id}`, { data: { token, userId } });
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, deleteBlog, updateComments };
