import axios from "../api/apiAxios";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const useRefreshToken = () => {
  const { setauth } = useContext(AuthContext);

  const refreshToken = async () => {
    console.log("Refreshing token...");
    try {
      const response = await axios.get("/api/auth/refresh-token/", {
        withCredentials: true,
      });
      setauth((prev) => {
        // console.log(JSON.stringify(prev));
        console.log(response);
        return {
          ...prev,
          accessToken: response.data.token,
          username: response.data.username,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  return refreshToken;
};
export default useRefreshToken;
