import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitQuery = async (data) => {
  const res = await API.post("/query", data);
  return res.data;
};

export const submitInterest = async (data) => {
  const res = await API.post("/interest", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export default API;
