import React from "react";
import { BiSearch } from "react-icons/bi";

function MessagesBox() {
  return (
    <div className="absolute   w-full h-full bg-prim1 sm:bg-prim2 sm:relative  sm:w-[55%] md:w-[65%] lg:w-[70%] z-[1]">
      <div className="absolute w-full bg-prim1 bottom-0 h-[55px] px-4  py-1">
        <form action="" className="w-full py-1 ">
          <ul className="relative flex border-[2px] p-[1px] border-prim2 rounded-full   ">
            <input
              type="text"
              id="chat-search"
              placeholder="send message . . ."
              className="w-full outline-none bg-transparent pl-3 pr-1"
            />
            <button
              type="submit"
              className=" text-prim1 p-[6px]  bg-prim2 rounded-full"
            >
              <BiSearch size={20} />
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default MessagesBox;
