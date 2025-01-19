import { useNavigate } from "react-router-dom"
import { arrow_icon, logo } from "../assets"
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";

function Navbar() {

  const navigate = useNavigate();

  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext)
  
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
        <img onClick={() => navigate('/')} src={logo} alt="" className="w-28 sm:w-32" />

        { userData ? 
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
            {userData?.name[0].toUpperCase()}
          </div> :
          <button onClick={() => navigate('/login')} className="
            flex items-center gap-2 border border-gray-500 
            rounded-full px-6 py-2 text-gray-800 
            hover:bg-gray-100 transition-all"
        >
          Login <img src={arrow_icon} alt="" />
        </button>
        }

        
    </div>
  )
}

export default Navbar