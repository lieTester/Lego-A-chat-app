import { AiOutlineCloseCircle, AiFillLock } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import logo from "../../assets/images/logo2.png";

function forgotPassword() {
  return (
    <form
      action=""
      className=" w-full lg:w-[60%] xl:w-[50%] mx-auto [&>*]:mb-5  [&>*]:py-2"
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
            <MdMarkEmailRead />
          </li>
          <li className="float-right">
            <AiOutlineCloseCircle />
          </li>
        </label>
        <input type="email" name="email" placeholder="Email address" />
      </ul>
      <ul className="relative w-[90%]  rounded-[5px] [&>label]:absolute [&>input]:z-[5] [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent border-prim2 border-[1px] z-[2]">
        <label
          htmlFor="username"
          className="py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] "
        >
          <li className="float-left">
            <AiFillLock />
          </li>
          <li className="float-right">
            <AiOutlineCloseCircle />
          </li>
        </label>
        <input type="password" name="password" placeholder="Password" />
      </ul>
      <ul className="relative w-[90%]  rounded-[5px] [&>label]:absolute [&>input]:z-[5] [&>input]:!mt-[2px] [&>input]:outline-none [&>input]:w-[calc(100%-40px)] [&>input]:bg-transparent  border-prim2 border-[1px] z-[2]">
        <label
          htmlFor="username"
          className="py-1.5 px-1 w-full left-0 h-inherit text-[13px] z-[-1] "
        >
          <li className="float-left">
            <AiFillLock />
          </li>
          <li className="float-right">
            <AiOutlineCloseCircle />
          </li>
        </label>
        <input
          type="password"
          name="password"
          placeholder="Re-Enter Password"
        />
      </ul>

      <ul className="relative w-[90%] bg-prim2 rounded-[5px] text-prim1 shadow-[.5px_.5px_2px_var(--sh-prim1),-.5px_-.5px_2px_var(--sh-prim2)]">
        <button className="w-full">Submit</button>
      </ul>
    </form>
  );
}

export default forgotPassword;
