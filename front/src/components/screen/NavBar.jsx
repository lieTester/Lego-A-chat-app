import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { AiOutlineUsergroupAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiUser, BiMenu, BiSearch } from "react-icons/bi";
import user from "../../assets/images/user.png";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/apiAxios";

function NavBar() {
  const { auth } = useContext(AuthContext);
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = async () => {
    // axios for sending http cookie to api
    const response = await axios.get("api/auth/logout/", {
      withCredentials: true,
    });
    console.log(response.status);
    if (response.status === 204) {
      navigate("/login-register", { from: location, replace: true });
    }
  };

  return (
    <>
      <nav className="w-full h-[42px] z-20 bg-seco2 !py-[6px] flex justify-between text-prim1">
        <ul className="flex">
          <li
            className="sm:hidden  cursor-pointer  ml-4"
            onClick={() => {
              setSideBar(!sideBar);
            }}
          >
            <BiMenu size={30} />
          </li>
          <li className="font-[500] text-[22px] pl-4 ">
            <Link to="/">Lego</Link>
          </li>
        </ul>
        <div className="flex">
          <ul className="flex mr-4 text-[11px] text-prim2 [&>a>li]:font-[500] [&>a>li>*]:mx-auto [&>a>li]:cursor-pointer [&>a>li]:mx-2 [&>a>li]:md:mx-3 [&>a>li]:lg:mx-5 [&>a>li]:mt-[2px] ">
            <Link to="/search">
              <li className="hover:text-prim1">
                <BiSearch className="text-[24px] sm:text-[18px]" />
                <span className="hidden sm:block">Search</span>
              </li>
            </Link>
            <Link to="/contacts">
              <li className="hover:text-prim1 hidden sm:block">
                <BiUser size={18} />
                <span>Contacts</span>
              </li>
            </Link>
            <Link to="/new-group">
              <li className="hover:text-prim1 hidden sm:block">
                <AiOutlineUsergroupAdd size={18} />
                <span>New Group</span>
              </li>
            </Link>
            <Link to="/settings">
              <li className="hover:text-prim1 hidden sm:block">
                <FiSettings size={18} />
                <span>Settings</span>
              </li>
            </Link>
          </ul>
          <div className="hidden sm:block relative mr-4 z-[20] cursor-pointer [&:hover>ul]:!block">
            <ul>
              <li className="relative flex justify-center items-center w-[35px] h-[35px] bg-prim1 rounded-full">
                <img
                  src={user}
                  alt=""
                  className="!w-[30px] !h-[30px] rounded-full p-1"
                />
              </li>
            </ul>
            <ul className="absolute hidden text-sm right-0 w-fit   rounded-sm [&>*]:px-10 [&>*]:py-[3px] [&>*]:bg-seco2  overflow-hidden">
              <li className="w-0 h-[10px] !p-0 "></li>
              <li className="hover:bg-seco1 hover:text-prim3 before:hover:bg-seco1 before:absolute before:!w-4 before:!h-4 before:bg-seco2 brfore:z-[30] before:right-2 before:rotate-45 before:top-1 before:rounded-sm">
                {auth.username}
              </li>
              <li className="hover:text-prim3 hover:bg-seco1" onClick={logout}>
                logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={
          "w-full z-20 sm:hidden absolute top-0 transition-all !duration-100 bg-[#0d1122e8] overflow-hidden " +
          (sideBar ? "right-0" : "right-full")
        }
      >
        <div className="relative w-[92%] h-screen bg-prim2  ">
          <div className="relative w-full h-40 bg-seco2 px-4">
            <span
              className="absolute right-0 hover:text-prim1 cursor-pointer "
              onClick={() => {
                setSideBar(!sideBar);
              }}
            >
              <IoIosClose size={40} />
            </span>
            <ul className="relative w-fit p-2 top-[30px] bg-prim2 rounded-full">
              <img
                src={user}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
            </ul>
            <span className="absolute bottom-[20px]">Puneet Khandal</span>
          </div>
          <ul className="relative text-prim1 mx-auto [&>a>*]:cursor-pointer [&>a>*]:p-3  [&>a>*]:!w-full [&>a>*]:flex  ">
            <Link to="/new-group">
              <li className="hover:bg-prim1">
                <AiOutlineUsergroupAdd
                  size={20}
                  className="mr-3 text-prim2 mt-[2px]"
                />
                New Group
              </li>
            </Link>
            <Link to="/contacts">
              <li className="hover:bg-prim1">
                <BiUser size={20} className="mr-3 text-prim2 mt-[2px]" />
                Contacts
              </li>
            </Link>
            <Link to="/settings">
              <li className="hover:bg-prim1">
                <FiSettings size={20} className="mr-3 text-prim2 mt-[2px]" />
                Settings
              </li>
            </Link>
          </ul>
          <div className="w-full absolute bottom-0 ">
            <ul className="relative  bg-prim1 text-prim1 [&>*]:cursor-pointer [&>*]:px-3 [&>*]:py-2  [&>*]:!w-full [&>*]:flex  ">
              <li className=" justify-end">
                <AiOutlineInfoCircle
                  size={20}
                  className="mr-2 text-prim2 mt-[2px]"
                />
                About
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
