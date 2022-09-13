import { Routes, Route } from "react-router-dom";
import Remember from "./components/Remember";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import OtpVerification from "./components/OtpVerification";
import SearchBox from "./components/screen/SearchBox";
import ContactsBox from "./components/screen/ContactsBox";
import ChatsBox from "./components/screen/ChatsBox";

function App() {
  return (
    <div className="bg-prim1">
      <Routes>
        <Route path="login-register" element={<Authentication />} />
        <Route path="verify-OTP" element={<OtpVerification />} />

        <Route path="/" element={<Remember />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<ChatsBox />} />
            <Route path="search" element={<SearchBox />} />
            <Route path="contacts" element={<ContactsBox />} />
            {/* <Route path="new-group" element={<NewGroup/>} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
