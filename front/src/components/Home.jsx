import { Outlet } from "react-router-dom";
import { ChatInfoProvider } from "../context/ChatInfoProvider";
import MessagesBox from "./screen/MessagesBox";
import NavBar from "./screen/NavBar";

function Home() {
   return (
      <ChatInfoProvider>
         <div className="relative h-screen  text-prim2 font-baloo ">
            <NavBar />
            <div className="relative h-[calc(100%-44px)] flex z-10">
               <Outlet />
               <MessagesBox />
            </div>
         </div>
      </ChatInfoProvider>
   );
}
export default Home;
