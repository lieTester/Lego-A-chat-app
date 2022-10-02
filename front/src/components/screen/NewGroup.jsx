import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { BiSearch } from "react-icons/bi";

import profile from "../../assets/images/user.png";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function NewGroup() {
  const { auth } = useContext(AuthContext);
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [added, setAdded] = useState([auth.id]);
  const [userContacts, setUserContacts] = useState();
  const [userSearch, setUserSearch] = useState({ value: "" });

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
    if (added.indexOf(e.target.id) > -1) {
      setAdded((prev) => prev.filter((data) => data !== e.target.id));
    } else {
      setAdded([...added, e.target.id]);
    }
  };

  const createGroup = useFormik({
    initialValues: { name: "" },
    onSubmit: async (values) => {
      // console.log(added);
      try {
        await AxiosPrivate.post(
          "api/chat/group/create",
          JSON.stringify({ users: added, name: values.name })
        )
          .then((response) => {
             navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error.message);
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Please Enter name";
      }
      return errors;
    },
  });

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
      <section
        className={
          "px-4 pb-4 h-fit  flex flex-wrap  justify-around overflow-y-auto " +
          (added.length > 1
            ? "max-h-[calc(100%-55px-55px)]"
            : "max-h-[calc(100%-55px)]")
        }
      >
        {userContacts &&
          userContacts.map((user, index) => {
            return (
              <ul
                key={index}
                className="h-auto w-[120px] my-1  p-1   rounded-[3px] hover:bg-prim2 "
                onClick={() => {}}
              >
                <li className="relative mx-auto flex justify-center items-center w-[45px] h-[45px] shadow-[1px_2px_2px_var(--sh-prim1),-1px_-2px_2px_var(--sh-prim2),inset_1px_1px_4px_var(--sh-prim1),inset_-1px_-1px_4px_var(--sh-prim2)]  rounded-full">
                  <img
                    src={user?.profile ? user.profile : profile}
                    alt=""
                    className="!w-[42px] !h-[42px] rounded-full p-1"
                  />
                </li>
                <li className=" relative mx-auto my-[2px]  [&>*]:block text-center">
                  <span className="text-prim1 ">{user.name}</span>
                  <span
                    onClick={manageGroupMembr}
                    id={user.id}
                    className={
                      "relative text-prim1 text-sm mt-[2px]  rounded-[2px] cursor-pointer before:absolute before:inset-0  " +
                      (added.indexOf(user.id) > -1 ? "bg-error" : "bg-seco2")
                    }
                  >
                    {added.indexOf(user.id) > -1 ? "Remove" : "Add"}
                  </span>
                </li>
              </ul>
            );
          })}
      </section>
      {/* if list has value */}
      <section
        className={
          " absolute w-full bg-prim1 flex items-center bottom-0 h-[55px] px-4  py-1 " +
          (added.length > 1 ? "" : " hidden")
        }
      >
        <form
          action=""
          className="w-full  "
          onSubmit={createGroup.handleSubmit}
        >
          <ul
            className={
              " flex border-[2px] p-[1px] border-prim2 rounded-full " +
              (createGroup.errors.name ? "border-error  " : "border-prim2")
            }
          >
            <input
              type="text"
              name="name"
              placeholder={
                createGroup.errors.name
                  ? createGroup.errors.name
                  : "Enter group name . . ."
              }
              value={createGroup.name}
              autoComplete="off"
              onChange={createGroup.handleChange}
              className={
                "w-full outline-none bg-transparent pl-3 pr-1 " +
                (createGroup.errors.name ? "placeholder:text-error" : "")
              }
            />
            <button
              type="submit"
              className={
                " text-prim1 px-[14px] py-[5px]   text-[14px] rounded-r-full " +
                (createGroup.errors.name ? "bg-error" : "bg-prim2")
              }
            >
              Create
            </button>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default NewGroup;
