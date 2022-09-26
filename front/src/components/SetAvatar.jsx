import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import { AxiosAvatar } from "../api/apiAxios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import logo from "../assets/images/logo2.png";
import AuthContext from "../context/AuthProvider";
import Toaster from "./subcomponent/Toaster";
import { toast } from "react-toastify";
import { Buffer } from "buffer";

function SetAvatar() {
  const navigate = useNavigate();
  const location = useLocation();
  const AxiosPrivate = useAxiosPrivate();
  const { setauth } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const tostOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    theme: "dark",
  };

  const [avatars, setAvatars] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const addAvatar = async () => {
    await AxiosPrivate.post(
      "/api/auth/profile",
      JSON.stringify({ avatar: avatars[selectedAvatar] })
    )
      .then((response) => {
        toast.success(response.data.msg, tostOptions);
        setauth((prev) => {
          return { ...prev, profile: avatars[selectedAvatar] };
        });
        setTimeout(function () {
          navigate(from, { replace: true });
        }, 4000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showAvatar = async () => {
    let data = [];
    setIsLoding(true);
    setSelectedAvatar(0);
    for (let i = 0; i < 8; i++) {
      console.log(i);
      await AxiosAvatar.get(`/${Math.round(Math.random() * 1000)}`)
        .then((response) => {
          const buffer = new Buffer(response.data);
          data.push(buffer.toString("base64"));
        })
        .catch((error) => {
          //   console.error(error);
        });
    }
    if (data.length > 0) {
      setAvatars(data);
      setIsLoding(false);
    }
  };

  useEffect(() => {
    showAvatar();
    return () => {};
  }, []);

  return (
    <div className=" font-baloo flex items-center text-prim2 min-h-screen    w-full py-4">
      <div className="mx-auto w-full ">
        <img
          src={logo}
          alt=""
          className="w-[100px] sm:w-[150px] lg:w-[200px] mx-auto"
        />
        <label
          htmlFor=""
          className="font-sofiaPro text-prim1 block text-center md:text-2xl"
        >
          Select an{" "}
          <span className="text-seco2 font-semibold text-lg md:text-3xl">
            Avatar
          </span>{" "}
          for
          <span className="text-seco2 font-semibold text-lg md:text-3xl">
            {" "}
            profile
          </span>
        </label>
        <section className="h-auto flex justify-center flex-wrap px-10 mt-10 ">
          {isLoding ? (
            <div className="py-28 m-2  rounded-full ">Loding . . .</div>
          ) : (
            avatars.map((avatar, index) => {
              return (
                <span
                  key={index}
                  className={
                    "p-2 m-2  rounded-full " +
                    (selectedAvatar === index ? "bg-seco2" : "bg-prim2")
                  }
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt=""
                    className="w-[70px] mx-auto"
                  />
                </span>
              );
            })
          )}
        </section>
        <div className="flex mt-10 justify-center text-prim1 text-[16px]">
          <button
            className="py-1 pr-3 pl-1 flex bg-seco2 mr-8 rounded-sm"
            onClick={showAvatar}
          >
            <BiRefresh size={20} className="mt-[2px]" />
            Refresh
          </button>
          <button
            className="py-1 px-3 bg-seco2  rounded-sm"
            onClick={addAvatar}
          >
            Submit
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SetAvatar;
