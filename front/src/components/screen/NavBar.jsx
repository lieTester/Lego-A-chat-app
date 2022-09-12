import { useState } from "react";
import { IoIosClose} from "react-icons/io";
import { AiOutlineUsergroupAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiUser, BiMenu, BiSearch } from "react-icons/bi";
import user from "../../assets/images/user.png";
function NavBar() {
  const [sideBar, setSideBar] = useState(false);
  return (
    <>
      <div
        className={
          "w-full z-20 sm:hidden absolute transition-all !duration-100 bg-[#0d1122e8] overflow-hidden " +
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
              <img src={user} alt="" className="w-[40px] h-[40px]" />
            </ul>
            <span className="absolute bottom-[20px]">Puneet Khandal</span>
          </div>
          <ul className="relative text-prim1 mx-auto [&>*]:cursor-pointer [&>*]:p-3  [&>*]:!w-full [&>*]:flex  ">
            <li className="hover:bg-prim1">
              <AiOutlineUsergroupAdd
                size={20}
                className="mr-3 text-prim2 mt-[2px]"
              />
              New Group
            </li>
            <li className="hover:bg-prim1">
              <BiUser size={20} className="mr-3 text-prim2 mt-[2px]" />
              Contacts
            </li>
            <li className="hover:bg-prim1">
              <FiSettings size={20} className="mr-3 text-prim2 mt-[2px]" />
              Settings
            </li>
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
      <nav className="w-full h-[40px] z-20 bg-seco2 py-1 flex justify-between text-prim1">
        <ul className="flex">
          <li
            className="sm:hidden  cursor-pointer  ml-4"
            onClick={() => {
              setSideBar(!sideBar);
            }}
          >
            <BiMenu size={30} />
          </li>
          <li className="font-[500] text-[22px] ml-3 ">Lego</li>
        </ul>
        <ul>
          <li className="cursor-pointer  mr-4 mt-1">
            <BiSearch size={24} />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
