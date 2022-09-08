import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/AuthProvider";

function Remember() {
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && auth?.remember
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => (isMounted = false);
  }, [refreshToken, auth]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading, auth]);
  return (
    <>
      {auth?.email ? (
        // user is authenticated
        !auth?.remember ? (
          // if we want to remember the user
          <Outlet />
        ) : isLoading ? (
          // if users refresh token is in loader phase
          <div className="bg-prim1 h-screen flex justify-center items-center text-prim2">Loading...</div>
        ) : (
          // everthing working correctly
          <Outlet />
        )
      ) : (
        // if still we don't have login user will navigate to the loginregistration page
        <Navigate to="/login-register" state={{ from: location }} replace />
      )}
    </>
  );
}

export default Remember;
