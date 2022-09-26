import { useContext } from "react";
import user from "../../../assets/images/user.png";
import ChatInfoContext from "../../../context/ChatInfoProvider";
function ChatBlock({ data }) {
  const { setChatInfo } = useContext(ChatInfoContext);
  const handelCurrentChat = (data) => {
    setChatInfo((prev) => {
      return {
        ...prev,
        current_chatId: data.id,
        current_isGroup: data.group,
        current_chatName: data.name,
        current_chatProfile: data.profile,
        messageBox: {
          zIndex: true,
        },
      };
    });
  };
  return (
    <ul
      className="h-auto px-4 flex py-2 hover:bg-prim2 cursor-pointer"
      onClick={() => {
        handelCurrentChat(data);
      }}
    >
      <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
        <img
          src={
            data?.profile ? `data:image/svg+xml;base64,${data.profile}` : user
          }
          alt=""
          className="!w-[42px] !h-[42px] rounded-full p-1"
        />
        <label className="absolute bg-seco2 w-[13px] h-[13px]  p-[1px] rounded-full text-[9px] text-prim1 text-center bottom-0 ml-8">
          {/* will use it for total number of unseen 
              messages but for no not thought of backend 
              storage way of it*/}
        </label>
      </li>
      <li className=" relative w-[calc(100%-45px)] pl-4   [&>*]:block">
        <span className="absolute right-0 text-[12px]">{data.date}</span>
        <span className="text-prim1">{data.name} </span>
        <span className="text-[13px]">{data.message}</span>
      </li>
    </ul>
  );
}

export default ChatBlock;
