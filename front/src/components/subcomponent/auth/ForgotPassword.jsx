import { AiOutlineCloseCircle, AiFillLock } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import { useContext } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo2.png";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/apiAxios";

function ForgotPassword() {
  const { setauth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const forgotPassForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      re_password: "",
    },
    onSubmit: async (values) => {
      try {
        toast.success('Waiting for response');
        const response = await axios.post(
          "/api/auth/forgot",
          JSON.stringify({
            email: values.email,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setauth((prev) => {
            return {
              ...prev,
              password: values.password,
              accessToken: response.data.token,
            };
          });
          toast.success(response.data.msg);
          values = {};
          setTimeout(() => {
            navigate("/verify-OTP", { from: location });
          }, 3000);
        }
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.msg);
      }
    },
    validate: (values) => {
      let errors = {};
      const emailregex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const passwordregex =
        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!emailregex.test(values.email)) {
        errors.email = "Please enter a valid email address";
      } else if (!values.password) {
        errors.password = "Password is required";
      } else if (!passwordregex.test(values.password)) {
        errors.password = "Not a valid password";
      } else if (!values.re_password || values.password !== values.re_password)
        errors.re_password = "Password and Re-Type not match";

      return errors;
    },
  });
  return (
    <form
      onSubmit={forgotPassForm.handleSubmit}
      action=""
      className=" w-full lg:w-[60%] xl:w-[50%] mx-auto [&>*]:mb-5  [&>*]:py-2"
    >
      <div className="relative w-[90%] pb-5 lg:w-[70%]  mx-auto [&>ul]:mt-5  [&>ul]:py-2">
        <div className="relative flex justify-center items-center bg-prim1 top-[-35px] w-[70px] h-[70px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full md:!mb-[50px]">
          <img
            src={logo}
            alt=""
            srcset=""
            className="rounded-full  w-[64px] h-[60px] "
          />
        </div>
        <ul
          className={
            " relative rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (forgotPassForm.errors.email
              ? "border-error mb-6 "
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (forgotPassForm.errors.email ? "text-error" : "")
            }
          >
            <li className="float-left">
              <MdMarkEmailRead />
            </li>
            {forgotPassForm.errors.email && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={forgotPassForm.handleChange}
            value={forgotPassForm.values.email}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {forgotPassForm.errors.email}
          </error>
        </ul>
        <ul
          className={
            "relative rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (forgotPassForm.errors.password
              ? "border-error mb-6"
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (forgotPassForm.errors.password ? "text-error" : "")
            }
          >
            <li className="float-left">
              <AiFillLock />
            </li>
            {forgotPassForm.errors.password && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={forgotPassForm.handleChange}
            value={forgotPassForm.values.password}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {forgotPassForm.errors.password}
          </error>
        </ul>
        <ul
          className={
            "relative   rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (forgotPassForm.errors.re_password
              ? "border-error mb-6"
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (forgotPassForm.errors.re_password ? "text-error" : "")
            }
          >
            <li className="float-left">
              <AiFillLock />
            </li>
            {forgotPassForm.errors.re_password && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="password"
            name="re_password"
            placeholder="Re-Enter Password"
            onChange={forgotPassForm.handleChange}
            value={forgotPassForm.values.re_password}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {forgotPassForm.errors.re_password}
          </error>
        </ul>
        {forgotPassForm.errors.password && (
          <ul className="block text-left text-error !mt-0">
            Password requinments :<br />
            <li className="ml-2 text-prim2">Atleast 6 characters long</li>
            <li className="ml-2 text-prim2">
              1 uppercase letter, 1 lowercase letter
            </li>
            <li className="ml-2 text-prim2">1 special symbol and 1 digit</li>
            <li className="ml-2 text-prim2">Demo: sefe12@Q</li>
          </ul>
        )}

        <ul className="relative bg-prim2 rounded-[5px] text-prim1 shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)]">
          <button type="submit" className="w-full">
            Submit
          </button>
        </ul>
      </div>
    </form>
  );
}

export default ForgotPassword;
