import { useEffect } from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import user from "../../assets/images/user.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChatBlock from "./screenSubComponents/ChatBlock";

function ChatsBox() {
  const [allChats, setAllChats] = useState();
  const [searchChat, setSearchChat] = useState();
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getChats = async () => {
      const data = await AxiosPrivate.get("/api/chat");
      if (data) {
        setAllChats(data.data.chats);
        // console.log(data.data.chats);
      }
    };
    getChats();
    return () => {};
  }, []);

  return (
    <div className="relative w-full h-full bg-prim1 sm:border-r-[2px] border-prim2 sm:w-[45%] md:w-[40%] lg:w-[30%] z-[2]">
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
              onChange={(e) => {
                setSearchChat(e.target.value);
              }}
              autocomplete="off"
              value={searchChat}
              className="w-full outline-none bg-transparent px-2"
            />
          </ul>
        </form>
      </div>
      <div className="relative h-[calc(100%-55px)]  overflow-y-auto pb-2">
        {allChats &&
          allChats.map((data, index) => {
            if (searchChat) {
              // this is a search chat based on key binding
              // if in data.name search chat string is present at
              // some index than it return +value or zero else -ve
              if (data.name.indexOf(searchChat) > -1)
                return <ChatBlock data={data} key={index} />;
            } else {
              return <ChatBlock data={data} key={index} />;
            }
          })}
      </div>
    </div>
  );
}

export default ChatsBox;
