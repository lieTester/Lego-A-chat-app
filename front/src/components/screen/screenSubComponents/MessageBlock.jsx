import { useContext } from "react";
import MessageDataContext from "../../../context/MessageDataProvider";

function MessageBlock({ data }) {
  const { messageData } = useContext(MessageDataContext);
  return (
    <div
      className={
        "w-full  flex " +
        (data.is_me
          ? "  justify-end [&>*]:rounded-l-lg [&>*]:rounded-tr-lg "
          : " [&>*]:rounded-r-lg [&>*]:rounded-tl-lg  ")
      }
    >
      <ul
        className={
          " !max-w-[70%]  overflow-hidden " +
          (messageData.group ? " !min-w-[70px] " : " !min-w-[40px] ")
        }
      >
        <li
          className={
            "flex " + (messageData.group ? "justify-between" : "justify-end")
          }
        >
          {messageData.group && (
            <span className="text-prim3 mt-[-2px] font-bold text-[13px] mr-3">
              {data.name}~
            </span>
          )}
          <span className="text-[10px]  text-prim2  ">{data.time}</span>
        </li>
        <li className="mr-2 break-words mt-[-4px] ">{data.text}</li>
      </ul>
    </div>
  );
}

export default MessageBlock;
