import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from './createcontext';
import axios from 'axios';

function Profile({ user, setImage, image }) {
  const { islogin, setIslogin } = useContext(context);
  const navigate = useNavigate();
  const ref = useRef(null);

  async function handleLogout() {
    console.log("Logging out...");
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true, // Ensure cookies are included
      });

      localStorage.removeItem("userdetail");
      localStorage.removeItem("islogin");
      setIslogin(false);
      navigate("/login"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function handleOutsideClick(e) {
    if (image && ref.current && !ref.current.contains(e.target)) {
      setImage(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup event listener
    };
  }, [image]); // Only re-run when `image` state changes

  return (
    <div className="w-full flex flex-col items-end relative z-50">
      {image && (
        <div ref={ref} className="flex items-center flex-col me-10 bg-white shadow-lg p-4 rounded-lg w-64 absolute right-0 mt-2">
          <img 
            src={user?.file || "https://via.placeholder.com/80"} 
            alt="Profile" 
            className="w-20 h-20 rounded-full mb-2 border"
          />

          <h1 className="text-lg font-semibold">{user?.username || "User"}</h1>

          <Link to="/profile">
            <h1 className="text-blue-500 hover:underline cursor-pointer">View Profile</h1>
          </Link>
          <button 
            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
