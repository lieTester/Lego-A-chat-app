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

      // Avoids unwanted call to verifyRefreshToken
      !auth?.accessToken && auth?.remember
         ? verifyRefreshToken()
         : setIsLoading(false);

      return () => (isMounted = false);
   }, [refreshToken, auth]);

   useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
   }, [isLoading, auth]);
   return (
      <>
         {auth?.remember ? (
            // user is authenticated
            isLoading ? (
               // if users refresh token is in loader phase
               <div className="bg-prim1 h-screen flex justify-center items-center text-prim2">
                  Loading
                  <div className="flex items-center justify-center mx-2 ">
                     <div className="flex space-x-2 animate-pulse">
                        <div className="dot delay-100"></div>
                        <div className="dot delay-200"></div>
                        <div className="dot delay-300"></div>
                     </div>
                  </div>
               </div>
            ) : auth?.accessToken ? (
               // if we want to remember the user
               <Outlet />
            ) : (
               // everthing working correctly
               <Navigate
                  to="/login-register"
                  state={{ from: location }}
                  replace
               />
            )
         ) : (
            // if still we don't have login user will navigate to the loginregistration page
            <Navigate to="/login-register" state={{ from: location }} replace />
         )}
      </>
   );
}

export default Remember;
