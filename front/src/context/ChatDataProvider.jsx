import { useState, createContext } from "react";

const ChatDataContext = createContext();
export const ChatDataProvider = ({ children }) => {
  const [auth, setauth] = useState({});

  return (
    <ChatDataContext.Provider value={{ auth, setauth }}>
      {children}
    </ChatDataContext.Provider>
  );
};

export default ChatDataContext;
