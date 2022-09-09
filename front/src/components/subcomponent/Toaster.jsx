import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  return (
    <ToastContainer
      toastClassName={() =>
        "bg-prim2  relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer my-2"
      }
      bodyClassName={() =>
        "bg-prim2 !text-prim1 flex item-center [&>:nth-child(2)]:pt-[10px] text-sm !h-[40px] p-0"
      }
      position="bottom-right"
      autoClose={8000}
      pauseOnHover={true}
    />
  );
}
