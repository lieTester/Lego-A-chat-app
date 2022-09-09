import {useContext,useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
function Home() {
  const { auth } = useContext(AuthContext);
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await AxiosPrivate.get("/api/auth/test", {
          signal: controller.signal,
        });
        console.log(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  },[]);
  console.log(auth);
  return (
    <div className='min-h-screen bg-prim1'>Home</div>
  )
}
export default Home