import { AiOutlineCloseCircle, AiFillLock } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { useFormik } from "formik";
import logo from "../../assets/images/logo2.png";
import { useNavigate,useLocation } from "react-router-dom";

function Login({ setForm }) {
  const { setauth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setauth((prev) => {
        console.log(values,prev);
        return { ...prev, email:'sdfjsdnf' };
      });
      navigate(from, { replace: true });
    }
  });

  return (
    <form onSubmit={loginForm.handleSubmit} className=" w-full ">
      <div className="relative w-[90%] pb-5 lg:w-[60%] xl:w-[50%] mx-auto [&>ul]:mt-5  [&>ul]:py-2">
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
            (loginForm.errors.email ? "border-error mb-6 " : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (loginForm.errors.email ? "text-error" : "")
            }
          >
            <li className="float-left">
              <MdMarkEmailRead />
            </li>
            {loginForm.errors.email && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {loginForm.errors.email}
          </error>
        </ul>
        <ul
          className={
            "relative rounded-[5px] [&>label]:absolute  [&>input]:z-[5]  [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-[2px] z-[2] " +
            (loginForm.errors.password ? "border-error mb-6" : "border-prim2")
          }
        >
          <label
            htmlFor="username"
            className={
              "py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] " +
              (loginForm.errors.password ? "text-error" : "")
            }
          >
            <li className="float-left">
              <AiFillLock />
            </li>
            {loginForm.errors.password && (
              <li className="float-right">
                <AiOutlineCloseCircle />
              </li>
            )}
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={loginForm.handleChange}
            value={loginForm.values.password}
          />
          <error className="absolute block text-error bottom-[-24px] right-0">
            {loginForm.errors.password}
          </error>
        </ul>
        <ul className="relative  bg-prim2 rounded-[5px] text-prim1 shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)]">
          <button type="submit" className="w-full">
            Login
          </button>
        </ul>
        <ul className="relative text-[crimson] top-[-20px] !text-right  ">
          <label
            htmlFor=""
            onClick={() => {
              setForm("forgot-password");
            }}
            className="cursor-pointer"
          >
            forgotPassword?
          </label>
        </ul>
      </div>
    </form>
  );
}

export default Login;
