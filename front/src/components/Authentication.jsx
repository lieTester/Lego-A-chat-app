import Login from "./subcomponent/auth/Login";
import Register from "./subcomponent/auth/Register";
import ForgotPassword from "./subcomponent/auth/ForgotPassword";
import authentication from "../assets/images/authenticate2.svg";
import Toaster from "./subcomponent/Toaster";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/AuthProvider";

function Authentication() {
   // set which form should be show
   const [userform, setForm] = useState("login");
   // rander the type of form user wanted
   const changeForm = () => {
      // console.log(userform);
      switch (userform) {
         case "forgot-password":
            return <ForgotPassword />;
         case "login":
            return <Login setForm={setForm} />;
         default:
            return <Register />;
      }
   };
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

   return isLoading ? (
      // if users refresh token is in loader phase
      <div className="bg-prim1 h-screen flex justify-center items-center text-prim2">
         Loading
         <div className="flex items-center justify-center  ">
            <div className="flex space-x-2 animate-pulse">
               <div className="dot delay-100"></div>
               <div className="dot delay-200"></div>
               <div className="dot delay-300"></div>
            </div>
         </div>
      </div>
   ) : auth?.accessToken ? (
      // if we want to remember the user
      <Navigate to="/" state={{ from: location }} replace />
   ) : (
      // everthing working correctly
      <div className=" font-baloo  text-prim2 min-h-screen  flex  w-full py-4">
         <center className="m-auto w-full md:w-[90%] lg:w-[70%] h-fit max-h-[calc(100%-40px)] ">
            <div className="relative flex flex-wrap md:flex-nowrap w-[95%] h-auto max-h-[1000px] text-[15px] transition-[height] duration-[2s]   shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)] rounded-md">
               <div className="relative flex flex-wrap justify-center w-full h-[120px] md:w-[50%] md:py-10 lg:w-[35%] md:h-auto bg-seco2 rounded-tl-md rounded-tr-md md:rounded-tr-none md:rounded-bl-md ">
                  <img
                     src={authentication}
                     alt=""
                     srcset=""
                     className="hidden md:block w-[90%] mt-[20%]"
                  />
                  <div className="mt-10 md ">
                     {userform === "login" ? (
                        <div>
                           New to lego?
                           <span
                              className="ml-2 font-bold text-prim3 cursor-pointer"
                              onClick={() => {
                                 setForm("register");
                              }}
                           >
                              Register
                           </span>
                        </div>
                     ) : (
                        <div>
                           Already registered?
                           <span
                              className="ml-2 font-bold text-prim3 cursor-pointer"
                              onClick={() => {
                                 setForm("login");
                              }}
                           >
                              Login
                           </span>
                        </div>
                     )}
                  </div>
               </div>
               {changeForm()}
            </div>
         </center>
         <Toaster />
      </div>
   );
}

export default Authentication;
