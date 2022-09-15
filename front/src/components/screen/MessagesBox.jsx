import { useState, useEffect, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import user from "../../assets/images/user.png";
import MessageDataContext from "../../context/MessageDataProvider";
import NoChatDisplay from "./screenSubComponents/NoChatDisplay";
function MessagesBox() {
  const [messages, setMessages] = useState();
  const { messageData, setMessageData } = useContext(MessageDataContext);
  useEffect(() => {}, []);
  const showMessages = (data, time, is_me) => {
    return (
      <div className={"flex" + (is_me ? " justify-end " : "")}>
        <ul>
          <li className="absolute right-1 text-[10px] top-[-0.5px] text-prim2 ">
            {time}
          </li>
          <li className="mr-2 mt-[2px]">{data}</li>
        </ul>
      </div>
    );
  };

  return messageData?.chat_id ? (
    <div
      className={
        "absolute   w-full h-full bg-msg_bg bg-cover sm:relative  sm:w-[55%] md:w-[60%] lg:w-[70%] " +
        (messageData.zIndex ? "z-[2]" : "z-[1]")
      }
    >
      <div className="relative h-[calc(100%-55px)] overflow-y-auto  pb-2 pt-[65px] text-prim1 text-[15px] [&>*]:px-4 [&>section>div>ul]:relative [&>section>div>ul]:w-fit  [&>section>div>ul]:px-1  [&>section>div>ul]:pt-1  [&>section>div>ul]:bg-seco2 [&>section>div>ul]:mb-2 [&>section>div>ul]:pr-4 [&>section>div>ul]:rounded-[3px] ">
        <div className="fixed w-full h-[55px] top-[42px]  bg-prim1 z-[20] sm:w-[55%] md:w-[60%] lg:w-[70%]">
          <ul className="h-auto !w-full flex !p-0 !pt-1 !bg-transparent cursor-pointer">
            <li
              className=" sm:hidden mr-4 my-auto"
              onClick={() => {
                setMessageData((prev) => {
                  return { ...prev, zIndex: false };
                });
              }}
            >
              <BsFillArrowLeftCircleFill size={24} />
            </li>
            <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
              <img
                src={user}
                alt=""
                className="!w-[42px] !h-[42px] rounded-full p-1"
              />
            </li>
            <li className=" relative w-[calc(100%-45px)] pl-4   [&>*]:block">
              <span className="absolute right-0 text-[12px]"></span>
              <span className="text-prim1">{messageData.name} </span>
              <span className="text-[13px]">online</span>
            </li>
          </ul>
        </div>
        <section>
          {showMessages("Kha h", "2:10 pm", false)}
          {showMessages("ghar pe", "2:10 pm", true)}
          {showMessages("bhar chalke ate h", "2:11 pm", false)}
          {showMessages("kaha gaya", "2:11 pm", false)}
          {showMessages("yahi hu", "2:12 pm", true)}
          {showMessages("man nahi h bad me", "2:12 pm", true)}
          {showMessages("abhi kam h", "2:13 pm", true)}
          {showMessages("5 min lagenge", "2:13 pm", false)}
          {showMessages("me a raha hu tu chalega bs", "2:14 pm", false)}
          {/*  */}
          {showMessages("Kha h", "2:10 pm", false)}
          {showMessages("ghar pe", "2:10 pm", true)}
          {showMessages("bhar chalke ate h", "2:11 pm", false)}
          {showMessages("kaha gaya", "2:11 pm", false)}
          {showMessages("yahi hu", "2:12 pm", true)}
          {showMessages("man nahi h bad me", "2:12 pm", true)}
          {showMessages("abhi kam h", "2:13 pm", true)}
          {showMessages("5 min lagenge", "2:13 pm", false)}
          {showMessages("me a raha hu tu chalega bs", "2:14 pm", false)}
          {showMessages("Kha h", "2:10 pm", false)}
          {showMessages("ghar pe", "2:10 pm", true)}
          {showMessages("bhar chalke ate h", "2:11 pm", false)}
          {showMessages("kaha gaya", "2:11 pm", false)}
          {showMessages("yahi hu", "2:12 pm", true)}
          {showMessages("man nahi h bad me", "2:12 pm", true)}
          {showMessages("abhi kam h", "2:13 pm", true)}
          {showMessages("5 min lagenge", "2:13 pm", false)}
          {showMessages("me a raha hu tu chalega bs", "2:14 pm", false)}
        </section>
      </div>
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
  ) : (
    <NoChatDisplay />
  );
}

export default MessagesBox;
