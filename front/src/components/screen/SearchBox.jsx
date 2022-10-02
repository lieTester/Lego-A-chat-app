import { useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import profile from "../../assets/images/user.png";

import ChatInfoContext from "../../context/ChatInfoProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function SearchBox() {
  const [userSearch, setUserSearch] = useState({ value: "" });
  const { setChatInfo } = useContext(ChatInfoContext);

  const [userSearchResult, setUserSearchResult] = useState();
  const AxiosPrivate = useAxiosPrivate();
  const findUser = async (e) => {
    e.preventDefault();
    await AxiosPrivate.post(
      "api/chat/search",
      JSON.stringify({ userSearch: userSearch.value })
    )
      .then((response) => {
        console.log(response.data);
        setUserSearchResult(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    await AxiosPrivate.post(
      "/api/chat",
      JSON.stringify({ connect: e.target.id })
    )
      .then((response) => {
        console.log(response);
        setChatInfo((prev) => {
          return {
            ...prev,
            current_chatId: response.data.id,
            current_isGroup: false,
            current_chatName: response.data.name,
            current_chatProfile: response.data.profile,
            messageBox: {
              zIndex: true,
            },
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="relative w-full h-full bg-prim1 sm:border-r-[2px] border-prim2 sm:w-[45%] md:w-[40%] lg:w-[30%] z-[2]">
      <div className=" h-[55px]  px-4 py-1">
        <form action="" className="w-full py-1 " onSubmit={findUser}>
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
              placeholder="Search user . . ."
              onChange={(e) => {
                e.preventDefault();
                setUserSearch({ value: e.target.value });
              }}
              autoComplete="off"
              value={userSearch.value}
              className="w-full outline-none bg-transparent px-2"
            />
          </ul>
        </form>
      </div>
      <section className="px-4 h-[calc(100%-55px)]">
        {userSearchResult &&
          userSearchResult.map((user, index) => {
            return (
              <ul
                key={index}
                className="h-auto px-2 flex py-1 bg-prim2  rounded-md mb-2 "
                onClick={() => {}}
              >
                <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
                  <img
                    src={user?.profile ? user.profile : profile}
                    alt=""
                    className="!w-[42px] !h-[42px] rounded-full p-1"
                  />
                </li>
                <li className=" relative flex justify-between items-center w-[calc(100%-45px)] pl-4   [&>*]:block">
                  <span className="text-prim1 ">{user.name}</span>
                  <span
                    id={user.id}
                    className="text-prim1 text-sm bg-seco2 px-2 py-2 rounded-md cursor-pointer"
                    onClick={sendMessage}
                  >
                    Send Message
                  </span>
                </li>
              </ul>
            );
          })}
      </section>
    </div>
  );
}

export default SearchBox;
