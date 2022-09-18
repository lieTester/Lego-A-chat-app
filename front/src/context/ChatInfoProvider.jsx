
import { useState, createContext } from "react";

const ChatInfoContext = createContext();
export const ChatInfoProvider = ({ children }) => {
  const [chatInfo, setChatInfo] = useState({});

  return (
    <ChatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatInfoContext.Provider>
  );
};

export default ChatInfoContext;