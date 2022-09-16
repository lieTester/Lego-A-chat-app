import { useContext } from "react";
import { useFormik } from "formik";

import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCloseCircle, AiFillLock } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "../../../api/apiAxios";
import AuthContext from "../../../context/AuthProvider";
import logo from "../../../assets/images/logo2.png";

function Register() {
  const { setauth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const registerForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "/api/auth/register",
          JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setauth((prev) => {
            // console.log(response.data, prev);
            return { ...prev, accessToken: response.data.token };
          });
          toast.success(response.data.msg);
          values = {};
          setTimeout(() => {
            navigate("/verify-OTP", { from: location });
          }, 3000);
        }
      } catch (error) {
        // console.error(error);
        toast.error(error.response.data.msg);
      }
      // tmppass =sefe12@Q
    },
    validate: (values) => {
      let errors = {};
      const emailregex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      const passwordregex =
        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
      if (!values.username || values.username.length < 4) {
        errors.username = "username must atleast 4 characters";
        return errors;
      } else if (!values.email) {
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
  // console.log(registerForm.values.username.length);
  return (
    <form onSubmit={registerForm.handleSubmit} className="w-full ">
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
            "relative  rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (registerForm.errors.username
              ? "border-error mb-6"
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (registerForm.errors.username ? "text-error" : "")
            }
          >
            <li className="float-left text-[11px]">
              <FaUser />
            </li>
            {registerForm.errors.username && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={registerForm.handleChange}
            value={registerForm.values.username}
            maxLength={12}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {registerForm.errors.username}
          </error>
        </ul>
        <ul
          className={
            " relative rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (registerForm.errors.email ? "border-error mb-6 " : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (registerForm.errors.email ? "text-error" : "")
            }
          >
            <li className="float-left">
              <MdMarkEmailRead />
            </li>
            {registerForm.errors.email && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={registerForm.handleChange}
            value={registerForm.values.email}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {registerForm.errors.email}
          </error>
        </ul>
        <ul
          className={
            "relative rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (registerForm.errors.password
              ? "border-error mb-6"
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (registerForm.errors.password ? "text-error" : "")
            }
          >
            <li className="float-left">
              <AiFillLock />
            </li>
            {registerForm.errors.password && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={registerForm.handleChange}
            value={registerForm.values.password}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {registerForm.errors.password}
          </error>
        </ul>
        <ul
          className={
            "relative   rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (registerForm.errors.re_password
              ? "border-error mb-6"
              : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (registerForm.errors.re_password ? "text-error" : "")
            }
          >
            <li className="float-left">
              <AiFillLock />
            </li>
            {registerForm.errors.re_password && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="password"
            name="re_password"
            placeholder="Re-Enter Password"
            onChange={registerForm.handleChange}
            value={registerForm.values.re_password}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {registerForm.errors.re_password}
          </error>
        </ul>
        {registerForm.errors.password && (
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
        <ul className="relative  bg-prim2 rounded-[5px] text-prim1 shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)]">
          <button type="submit" className="w-full">
            Sign up
          </button>
        </ul>
      </div>
    </form>
  );
}

export default Register;
