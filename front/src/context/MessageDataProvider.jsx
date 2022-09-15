import { useState, createContext } from "react";

const MessageDataContext = createContext();
export const MessageDataProvider = ({ children }) => {
  const [messageData, setMessageData] = useState({});

  return (
    <MessageDataContext.Provider value={{ messageData, setMessageData }}>
      {children}
    </MessageDataContext.Provider>
  );
};

export default MessageDataContext;
