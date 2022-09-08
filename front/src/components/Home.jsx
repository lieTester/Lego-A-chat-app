import {useContext} from 'react'
import AuthContext from "../context/AuthProvider";
function Home() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <div>Home</div>
  )
}

export default Home