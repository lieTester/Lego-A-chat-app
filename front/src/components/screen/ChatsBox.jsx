import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import user from "../../assets/images/user.png";

function ChatsBox() {
  const [search, setSearch] = useState();
  const data = [
    {
      name: "rinki",
      message: "ye movie sahi h dekhi tune.",
      date: "Today 11:50",
      unseen: 1,
    },
    {
      name: "Adi",
      message: "bye.",
      date: "Yesterday",
      unseen: 2,
    },
    {
      name: "vishal",
      message:
        "somthing technical as we always talk about nothing serious. . . .",
      date: "8/9/2022",
      unseen: 1,
    },
  ];
  const arrangeData = () => {
    let overallChat = data.map((value, key) => {
      return (
        <ul className="h-auto px-4 flex py-2 hover:bg-prim2">
          <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
            <img
              src={user}
              alt=""
              className="!w-[42px] !h-[42px] rounded-full p-1"
            />
            <label className="absolute bg-seco2 w-[13px] h-[13px]  p-[1px] rounded-full text-[9px] text-prim1 text-center bottom-0 ml-8">
              {value.unseen}
            </label>
          </li>
          <li className=" relative w-[calc(100%-40px)]  ml-4 [&>*]:block">
            <span className="absolute right-0 text-[12px]">{value.date}</span>
            <label className="text-prim1">{value.name} </label>
            <label className="text-[13px]">{value.message}</label>
          </li>
        </ul>
      );
    });
    return overallChat;
  };

  return (
    <div className="relative w-full h-full bg-prim1  sm:w-[45%] md:w-[35%] lg:w-[30%] z-[2]">
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
      <div className="relative h-[calc(100%-55px)]  overflow-y-auto pb-2">
        {/* <ul className="h-auto flex my-3">
          <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
            <img
              src={user}
              alt=""
              className="!w-[42px] !h-[42px] rounded-full p-1"
            />
            <label className="absolute bg-seco2 w-[13px] h-[13px]  p-[1px] rounded-full text-[9px] text-prim1 text-center bottom-0 ml-8">
              1
            </label>
          </li>
          <li className=" relative w-[calc(100%-40px)]  ml-4 [&>*]:block">
            <span className="absolute right-0 text-[12px]">Today 11:50</span>
            <label className="text-prim1">rinki </label>
            <label className="text-[13px]">ye movie sahi h dekhi tune.</label>
          </li>
        </ul> */}

        {arrangeData()}
        {arrangeData()}
        {arrangeData()}
        {arrangeData()}
      </div>
    </div>
  );
}

export default ChatsBox;
