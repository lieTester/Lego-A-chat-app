import { useEffect, useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChatBlock from "./screenSubComponents/ChatBlock";
import ChatInfoContext from "../../context/ChatInfoProvider";
function ChatsBox() {
  const [searchChat, setSearchChat] = useState({ value: "" });
  const AxiosPrivate = useAxiosPrivate();
  const { chatInfo, setChatInfo } = useContext(ChatInfoContext);

  useEffect(() => {
    const getChats = async () => {
      await AxiosPrivate.get("/api/chat")
        .catch((error) => {
          console.error(error);
        })
        .then((response) => {
          if (response.status === 200) {
            setChatInfo((prev) => {
              return { ...prev, allChats: response.data.chats };
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getChats();

    return () => {};
  }, [AxiosPrivate, setChatInfo]);

  return (
    <div className="relative w-full h-full bg-prim1 sm:border-r-[2px] border-prim2 sm:w-[45%] md:w-[40%] lg:w-[30%] z-[2]">
      <div className=" h-[55px]  px-4 py-1">
        <form
          action=""
          className="w-full py-1 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
              onChange={(e) => {
                e.preventDefault();
                setSearchChat({ value: e.target.value });
              }}
              autoComplete="off"
              value={searchChat.value}
              className="w-full outline-none bg-transparent px-2"
            />
          </ul>
        </form>
      </div>
      <div className="relative h-[calc(100%-55px)]  overflow-y-auto pb-2">
        {chatInfo?.allChats &&
          chatInfo.allChats.map((data, index) => {
            if (searchChat.value) {
              // this is a search chat based on key binding
              // if in data.name search chat string is present at
              // some index than it return +value or zero else -ve
              if (data.name.toLowerCase().indexOf(searchChat.value.toLowerCase()) > -1)
                return <ChatBlock data={data} key={index} />;
              else return "";
            }
            return <ChatBlock data={data} key={index} />;
          })}
      </div>
    </div>
  );
}

export default ChatsBox;
