import { Routes, Route } from "react-router-dom";
import Remember from "./components/Remember";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import OtpVerification from "./components/OtpVerification";

function App() {
  return (
    <div className="bg-prim1 ">
      <Routes>
        <Route path="login-register" element={<Authentication />} />
        <Route path="verify-OTP" element={<OtpVerification />} />

        <Route path="/" element={<Remember />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
