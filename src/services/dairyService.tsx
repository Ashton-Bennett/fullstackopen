import { DiaryEntry } from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/diaries/";

export const getAllDiaries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.error(error);
    }
  }
};

export const createEntry = async (object: DiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error("ERROR:::", error.response);
      return {error:error.response?.data};
    } else {
      console.error(error);
    }
  }
};
