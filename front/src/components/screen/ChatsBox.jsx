import { useState } from "react";
import { BiSearch } from "react-icons/bi";

function ChatsBox() {
  const [search, setSearch] = useState();
  return (
    <div className="relative w-full h-full bg-prim1  sm:w-[40%] sm:borde md:w-[35%] lg:w-[30%] z-[2]">
      <div className=" h-[55px]  px-4 py-1">
        <form action="" className="w-full py-1 ">
          <ul className="relative flex border-[2px] p-[1px] border-prim2 rounded-full   ">
            <label
              htmlFor="chat-search"
              className=" text-prim1 p-[6px]  bg-prim2 rounded-l-full"
            >
              <BiSearch size={20} />
            </label>
            <input
              type="text"
              id="chat-search"
              maxLength={30}
              placeholder="search chats . . ."
              className="w-full outline-none bg-transparent px-2"
            />
          </ul>
        </form>
      </div>
      <div className="h-[calc(100%-55px)] px-4 overflow-y-auto ">
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        <ul className="h-[50px] mt-2">sdfsd</ul>
        
      </div>
    </div>
  );
}

export default ChatsBox;
