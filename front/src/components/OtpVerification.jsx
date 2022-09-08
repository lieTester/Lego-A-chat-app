import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import logo from "../assets/images/logo2.png";
import { CgPassword } from "react-icons/cg";

import { useFormik } from "formik";

function OtpVerification({ forgotPassword }) {
  const { setauth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const otpForm = useFormik({});
  const from = location.state?.from?.pathname || "/";

  const handleform = () => {
    try {
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" font-baloo  text-prim2 min-h-screen  flex  w-full py-4">
      <center className="m-auto w-full sm:w-[60%] lg:w-[50%] xl:w-[30%] h-fit max-h-[calc(100%-40px)] ">
        <div className="relative flex flex-wrap md:flex-nowrap w-[95%] h-auto max-h-[1000px] text-[15px] transition-[height] duration-[2s]   shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)] rounded-md">
          <form
            onSubmit={handleform}
            className=" w-full  mx-auto [&>*]:mb-5  [&>*]:py-2"
          >
            <div className="relative flex justify-center items-center bg-prim1 top-[-35px] w-[70px] h-[70px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full md:!mb-[50px]">
              <img
                src={logo}
                alt=""
                srcset=""
                className="rounded-full  w-[64px] h-[60px] "
              />
            </div>
            <ul className="relative w-[90%]  rounded-[5px] [&>label]:absolute [&>input]:z-[5] [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent  border-prim2 border-[1px] z-[2]">
              <label
                htmlFor="username"
                className="py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] "
              >
                <li className="float-left">
                  <CgPassword />
                </li>
              </label>
              <input type="text" name="OTP" placeholder="Enter OTP" />
            </ul>
            <ul className="relative w-[90%] bg-prim2 rounded-[5px] text-prim1 shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)]">
              <button className="w-full" type="submit">
                Verify
              </button>
            </ul>
          </form>
        </div>
      </center>
    </div>
  );
}

export default OtpVerification;
