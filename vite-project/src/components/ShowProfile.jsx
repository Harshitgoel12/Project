import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import context from "./createcontext";

function ShowProfile({ user, data, setHandleProfile }) {
  const { islogin, setIslogin } = useContext(context);
  const [userdetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userdetail")) || null
  );
  const manuRef = useRef(null);

  // ✅ Function to update `localStorage` and trigger a re-render
  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    setUserDetail(JSON.parse(localStorage.getItem("userdetail"))); // Force re-render
  };

  // ✅ Handle Logout
  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("userdetail");
    localStorage.removeItem("islogin");
    setUserDetail(null);
    setIslogin(false);
  }

  // ✅ Sync with `localStorage` changes using a MutationObserver
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setUserDetail(JSON.parse(localStorage.getItem("userdetail")) || null);
    });

    observer.observe(localStorage, { attributes: true, childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // ✅ Close profile modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (manuRef.current && !manuRef.current.contains(event.target)) {
        setHandleProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setHandleProfile]);

  return (
    <div className="w-full flex flex-col items-end relative">
      <div
        className="flex flex-col bg-white shadow-lg p-4 rounded-lg w-64 absolute right-0 mt-2"
        ref={manuRef}
      >
        <div className="flex">
          <img
            src={userdetail?.file || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-2 border"
          />
          <div>
            <h1 className="mt-5 ms-4 text-2xl font-bold">
              {userdetail?.username || "Guest"}
            </h1>
            <h1 className="ms-4 text-sm text-blue-500 hover:underline cursor-pointer">
              View Profile
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link to="/login">
            <h1 className="text-lg font-semibold hover:bg-gray-100 w-full py-3 text-center">
              {data[0]}
            </h1>
          </Link>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-3 text-center">
            {data[1]}
          </h1>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-3 text-center">
            {data[2]}
          </h1>
          <button
            className="mt-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
