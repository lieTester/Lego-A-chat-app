import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillArrowLeftCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import user from "../../assets/images/user.png";
import ChatInfoContext from "../../context/ChatInfoProvider";
import NoChatDisplay from "./screenSubComponents/NoChatDisplay";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MessageBlock from "./screenSubComponents/MessageBlock";
import AuthContext from "../../context/AuthProvider";
import io from "socket.io-client";

// use state fluctuate so most recent chat id
// if sender chat id and ours match, then we show to messageBox
var socket, USER_CURRENT_CHAT_ROOM, USER_LAST_MESSAGE;

function MessagesBox() {
  const AxiosPrivate = useAxiosPrivate();
  const messageBoxScroll = useRef();
  const { auth } = useContext(AuthContext);
  const [isLoding, setLoding] = useState(true);
  const [newMessage, setNewMessage] = useState({ value: "" });
  const [allMessages, setAllMessages] = useState([]);
  const { chatInfo, setChatInfo } = useContext(ChatInfoContext);

  // for messageBoxScroll
  useEffect(() => {
    messageBoxScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // setting a socket connection
  useEffect(() => {
    if (auth?.id) {
      socket = io(process.env.REACT_APP_END_POINT);
      socket.emit("user-online", auth.id);
    }
  }, [auth?.id]);

  // setting a current on chat connection
  useEffect(() => {
    if (chatInfo.current_chatId) {
      setLoding(true);
      USER_CURRENT_CHAT_ROOM = chatInfo.current_chatId;
      socket.emit("join-chat", chatInfo.current_chatId);
    }
  }, [chatInfo?.current_chatId]);

  const receiveNewMessage = useCallback((message) => {
    // we are useing this if condition because useEffect try
    // recive a emmit:new message more than it expected but only once we recive data
    // so we try to change when we get data
    // wanna understand this  above comment print console log before if statement
    // you'll understant.

    if (message) {
      console.log(
        USER_CURRENT_CHAT_ROOM,
        message.chatId,
        message.messageId,
        USER_LAST_MESSAGE,
        USER_CURRENT_CHAT_ROOM === message.chatId,
        message.text
      );

      if (USER_CURRENT_CHAT_ROOM !== message.chatId) {
      } else if (
        USER_CURRENT_CHAT_ROOM === message.chatId &&
        message.messageId !== USER_LAST_MESSAGE
      ) {
        USER_LAST_MESSAGE = message.messageId;
        setAllMessages((prev) => [
          ...prev,
          { time: message.time, text: message.text, name: message.name },
        ]);
      }
    }
  }, []);

  // reciving instant message for this chat
  useEffect(() => {
    socket.on("emit:new-message", receiveNewMessage);
    return () => {
      socket.off("emit:new-message", receiveNewMessage);
    };
  });

  // for receiveing messages on load
  useEffect(() => {
    const controller = new AbortController();
    const getMessages = async () => {
      // console.log(chatInfo.current_chatId, "this");
      await AxiosPrivate.post(
        "/api/message/get-messages",
        JSON.stringify({
          chatid: chatInfo.current_chatId,
        }),
        { signal: controller.signal }
      )
        .then((response) => {
          setLoding(false);
          setAllMessages(response.data.chatMessages);
        })
        .catch((error) => {
          console.log(error, "get-message");
          console.error(error.message);
        });
    };
    if (chatInfo.current_chatId) {
      // console.log("getting chatInfo");
      getMessages();
    }

    return () => {
      setLoding(false);
      controller.abort();
    };
  }, [AxiosPrivate, chatInfo?.current_chatId]);

  // sending latest message data from user to server
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosPrivate.post(
        "/api/message/",
        JSON.stringify({
          chatid: chatInfo.current_chatId,
          message: newMessage.value,
        })
      );
      if (response?.status === 200) {
        setNewMessage({ value: "" });
        // console.log(response.data);
        setAllMessages((prev) => [
          ...prev,
          {
            is_me: true,
            time: response.data.time,
            text: response.data.text,
            group: chatInfo.current_isGroup,
          },
        ]);
        socket.emit("new-message", response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return chatInfo?.current_chatId ? (
    <div
      className={
        "absolute   w-full h-full bg-msg_bg bg-cover sm:relative  sm:w-[55%] md:w-[60%] lg:w-[70%] " +
        (chatInfo.messageBox.zIndex ? "z-[2]" : "z-[1]")
      }
    >
      <div className="relative h-[calc(100%-55px)] overflow-y-auto  pb-2 pt-[65px] text-prim1 text-[15px] [&>*]:px-4 [&>section>div>ul]:relative [&>section>div>ul]:w-fit [&>section>div>ul]:px-1  [&>section>div>ul]:bg-seco2 [&>section>div>ul]:mb-2  ">
        <div className="fixed w-full h-[55px] top-[42px]  bg-prim1 z-[20] sm:w-[55%] md:w-[60%] lg:w-[70%]">
          <ul className="h-auto !w-full flex !p-0 !pt-1 !bg-transparent ">
            <li
              className=" sm:hidden mr-2 my-auto cursor-pointer"
              onClick={() => {
                setChatInfo((prev) => {
                  return { ...prev, messageBox: { zIndex: false } };
                });
              }}
            >
              <BsFillArrowLeftCircleFill size={24} />
            </li>
            <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
              <img
                src={
                  chatInfo?.current_chatProfile
                    ? `data:image/svg+xml;base64,${chatInfo.current_chatProfile}`
                    : user
                }
                alt=""
                className="!w-[42px] !h-[42px] rounded-full p-1 cursor-pointer"
              />
            </li>
            <li className=" relative w-[calc(100%-100px)] pl-4   [&>*]:block sm:w-[calc(100%-40px)]">
              <span className="absolute right-0 text-[12px]"></span>
              <span className="text-prim1">{chatInfo.current_chatName} </span>
              <span className="text-[13px]">online</span>
            </li>
            <li className="mt-3 cursor-pointer">
              <BsThreeDotsVertical size={24} />
            </li>
          </ul>
        </div>

        <section>
          {isLoding ? (
            <center>...Loding</center>
          ) : (
            allMessages.map((data, index) => {
              return <MessageBlock data={data} key={index} />;
            })
          )}
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
              value={newMessage.value}
              autoComplete="off"
              onChange={(e) => {
                e.preventDefault();
                setNewMessage({ value: e.target.value });
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
  ) : (
    <NoChatDisplay />
  );
}

export default MessagesBox;
