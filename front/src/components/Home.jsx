import { useContext, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import MessagesBox from "./screen/MessagesBox";
import NavBar from "./screen/NavBar";

function Home() {
  const { auth } = useContext(AuthContext);
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUsers = async () => {
  //     try {
  //       const response = await AxiosPrivate.get("/api/auth/test", {
  //         signal: controller.signal,
  //       });
  //       console.log(response.data);
  //     } catch (err) {
  //       console.error(err);
  //       // navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getUsers();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // },[]);
  console.log(auth);
  return (
    <div className="relative h-screen  text-prim2 font-baloo ">
      <NavBar />
      <div className="relative h-[calc(100%-44px)] flex z-10">
        <Outlet/>
        <MessagesBox />
      </div>
    </div>
  );
}
export default Home;
