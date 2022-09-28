import { useState, useContext, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import profile from "../../assets/images/user.png";

import ChatInfoContext from "../../context/ChatInfoProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function NewGroup() {
  const [userSearch, setUserSearch] = useState({ value: "" });
  const [added, setAdded] = useState([]);
  const { setChatInfo } = useContext(ChatInfoContext);

  const [userContacts, setUserContacts] = useState();
  const AxiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const findUser = async () => {
      await AxiosPrivate.get("api/chat/contacts")
        .then((response) => {
          setUserContacts(response.data.users);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    findUser();
  }, []);

  const manageGroupMembr = async (e) => {
    e.preventDefault();
    if (added.indexOf(e.target.id)>-1) {
      setAdded((prev) => prev.filter((data) => data !== e.target.id));
    } else {
      setAdded([...added, e.target.id]);
    }
  };
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
              placeholder="Find contact . . ."
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
      <section className="px-4">
        {userContacts &&
          userContacts.map((user, index) => {
            return (
              <ul
                key={index}
                className="h-auto px-2 flex py-2   rounded-[3px] hover:bg-prim2 "
                onClick={() => {}}
              >
                <li className="relative flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
                  <img
                    src={user?.profile ? user.profile : profile}
                    alt=""
                    className="!w-[42px] !h-[42px] rounded-full p-1"
                  />
                </li>
                <li className=" relative flex justify-between items-center w-[calc(100%-45px)] pl-3   [&>*]:block">
                  <span className="text-prim1 ">{user.name}</span>
                  <span
                    onClick={manageGroupMembr}
                    id={user.id}
                    className="relative text-prim1 text-sm bg-seco2 rounded-full cursor-pointer before:absolute before:inset-0  "
                  >
                    <MdOutlineAddCircle
                      size={20}
                      className={added.indexOf(user.id) > -1 ? "hidden" : ""}
                    />
                    <MdOutlineRemoveCircle
                      size={20}
                      className={added.indexOf(user.id) === -1 ? "hidden" : ""}
                    />
                  </span>
                </li>
              </ul>
            );
          })}
      </section>
    </div>
  );
}

export default NewGroup;
