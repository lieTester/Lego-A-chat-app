import { useState, useEffect, useContext, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillArrowLeftCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import user from "../../assets/images/user.png";
import MessageDataContext from "../../context/MessageDataProvider";
import NoChatDisplay from "./screenSubComponents/NoChatDisplay";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MessageBlock from "./screenSubComponents/MessageBlock";
import AuthContext from "../../context/AuthProvider";
import io from "socket.io-client";

// use state fluctuate so most recent chat id
// if sender chat id and ours match, then we show to messageBox
var socket, USER_CURRENT_CHAT_ROOM;

function MessagesBox() {
  const AxiosPrivate = useAxiosPrivate();
  const messageBoxScroll = useRef();
  const { auth } = useContext(AuthContext);
  const [isLoding, setLoding] = useState(true);
  const [typeMessage, setTypeMessage] = useState({ value: "" });
  const { messageData, setMessageData } = useContext(MessageDataContext);

  // for messageBoxScroll
  useEffect(() => {
    messageBoxScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData?.chatMessages]);

  // setting a socket connection
  useEffect(() => {
    socket = io(process.env.REACT_APP_END_POINT);
    messageBoxScroll.current?.scrollIntoView({ behavior: "smooth" });
    // socket.emit("user-online", auth.id);
  }, []);

  // setting a current on chat connection
  useEffect(() => {
    if (messageData.chat_id) {
      USER_CURRENT_CHAT_ROOM = messageData.chat_id;
      socket.emit("join-chat", messageData.chat_id);
    }
  }, [messageData?.chat_id]);

  // reciving instant message for this chat
  useEffect(() => {
    socket.on("emit:new-message", (message) => {
      if (USER_CURRENT_CHAT_ROOM === message.chatid) {
        console.log(message.userid);
      }
    });
  });

  // for receiveing messages on load
  useEffect(() => {
    try {
      const getMessages = async () => {
        // console.log(messageData.chat_id, "this");
        const response = await AxiosPrivate.post(
          "/api/message/get-messages",
          JSON.stringify({ chatid: messageData.chat_id })
        );
        if (response.status === 200) {
          setLoding(false);
          setMessageData((prev) => {
            return { ...prev, chatMessages: response.data.chatMessages };
          });
        }
      };
      if (messageData.chat_id) {
        // console.log("getting messageData");
        getMessages();
      }
    } catch (error) {
      console.error(error.message);
    }
    return () => {};
  }, [messageData?.chat_id, AxiosPrivate, setMessageData]);

  // sending latest message data from user to server
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosPrivate.post(
        "/api/message/",
        JSON.stringify({
          chatid: messageData.chat_id,
          message: typeMessage.value,
        })
      );
      if (response.status === 200) {
        socket.emit("new-message", {
          message: typeMessage.value,
          chatid: messageData.chat_id,
          userid: auth.id,
        });
        setTypeMessage({ value: "" });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return isLoding ? (
    <NoChatDisplay />
  ) : (
    <div
      className={
        "absolute   w-full h-full bg-msg_bg bg-cover sm:relative  sm:w-[55%] md:w-[60%] lg:w-[70%] " +
        (messageData.zIndex ? "z-[2]" : "z-[1]")
      }
    >
      <div className="relative h-[calc(100%-55px)] overflow-y-auto  pb-2 pt-[65px] text-prim1 text-[15px] [&>*]:px-4 [&>section>div>ul]:relative [&>section>div>ul]:w-fit [&>section>div>ul]:px-1  [&>section>div>ul]:bg-seco2 [&>section>div>ul]:mb-2  ">
        <div className="fixed w-full h-[55px] top-[42px]  bg-prim1 z-[20] sm:w-[55%] md:w-[60%] lg:w-[70%]">
          <ul className="h-auto !w-full flex !p-0 !pt-1 !bg-transparent ">
            <li
              className=" sm:hidden mr-2 my-auto cursor-pointer"
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
                className="!w-[42px] !h-[42px] rounded-full p-1 cursor-pointer"
              />
            </li>
            <li className=" relative w-[calc(100%-100px)] pl-4   [&>*]:block sm:w-[calc(100%-40px)]">
              <span className="absolute right-0 text-[12px]"></span>
              <span className="text-prim1">{messageData.name} </span>
              <span className="text-[13px]">online</span>
            </li>
            <li className="mt-3 cursor-pointer">
              <BsThreeDotsVertical size={24} />
            </li>
          </ul>
        </div>

        <section>
          {messageData?.chatMessages &&
            messageData.chatMessages.map((data, index) => {
              return <MessageBlock data={data} key={index} />;
            })}
        </section>

        <section ref={messageBoxScroll} id="sample-view-for-scroll"></section>
      </div>
      <div className="absolute w-full bg-prim1 bottom-0 h-[55px] px-4  py-1">
        <form action="" className="w-full py-1 " onSubmit={sendMessage}>
          <ul className="relative flex border-[2px] p-[1px] border-prim2 rounded-full   ">
            <input
              type="text"
              id="chat-search"
              placeholder="send message . . ."
              value={typeMessage.value}
              autoComplete="off"
              onChange={(e) => {
                e.preventDefault();
                setTypeMessage({ value: e.target.value });
              }}
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
