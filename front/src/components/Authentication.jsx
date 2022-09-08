import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Login from "./subcomponent/Login";
import Register from "./subcomponent/Register";
import ForgotPassword from "./subcomponent/ForgotPassword";
import authentication from "../assets/images/authenticate2.svg";

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

  return (
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
      <ToastContainer />
    </div>
  );
}

export default Authentication;
