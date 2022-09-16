import { useEffect } from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChatBlock from "./screenSubComponents/ChatBlock";

function ChatsBox() {
  const [allChats, setAllChats] = useState();
  const [searchChat, setSearchChat] = useState({value:''});
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getChats = async () => {
      const response = await AxiosPrivate.get("/api/chat");
      if (response) {
        setAllChats(response.data.chats);
        // console.log(response.data.chats);
      }
    };
    getChats();
    return () => {};
  }, [AxiosPrivate, setAllChats]);

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
                e.preventDefault();
                setSearchChat({value:e.target.value});
              }}
              autoComplete="off"
              value={searchChat.value}
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
              else return "";
            }
            return <ChatBlock data={data} key={index} />;
          })}
      </div>
    </div>
  );
}

export default ChatsBox;
