import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});
export const AxiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
