import { useState } from "react";
import ChatsBox from "./ChatsBox";
import SearcBox from "./SearchBox";
import MessagesBox from "./MessagesBox";
import NavBar from "./NavBar";
import ContactsBox from "./ContactsBox";
function ScreenMain() {
  const [blockType,setBlockType] = useState('');
  const handelBlock = (type) => {
    switch (type) {
      case "SearchBox":
        return <SearcBox />;
      case "Contacts":
        return <ContactsBox />;
      default:
        return <ChatsBox />;
    }
  };
  return (
    <>
      <NavBar />
      <div className="relative h-[calc(100%-44px)] flex z-10">
        {handelBlock(blockType)}
        <MessagesBox />
      </div>
    </>
  );
}

export default ScreenMain;
