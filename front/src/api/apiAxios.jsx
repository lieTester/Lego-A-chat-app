import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
});
export const AxiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const AxiosAvatar = axios.create({
  baseURL: process.env.REACT_APP_AVATAR_END_POINT,
});
