import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import context from "./createcontext";

function ShowProfile({ user, data, setHandleProfile, handleprofile }) {
  const { setIslogin } = useContext(context);
  const [userdetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userdetail")) || null
  );
  const menuRef = useRef(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userdetail");
    localStorage.removeItem("islogin");
    setUserDetail(null);
    setIslogin(false);
    setHandleProfile(false);
  };

  // Close dropdown on outside click
  const handleClickOutside = (e) => {
    if (handleprofile && menuRef.current && !menuRef.current.contains(e.target)) {
      setHandleProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleprofile]);

  // Determine links dynamically
  const links = user?.role === "recruiter"
    ? [
        { path: "/", label: data[0] },
        { path: "/my-job", label: data[1] },
        { path: "/postjob", label: data[2] },
        { path: "/AppliedStudent", label: data[3] },
        { path: "/Shortlisted", label: data[4] },
      ]
    : [
        { path: "/", label: data[0] },
        { path: "/MyAppliedJobs", label: data[1] },
        { path: "/jobs", label: data[2] },
        { path: "/", label: data[3] },
      ];

  return (
    <div className="w-full flex flex-col items-end relative z-50" ref={menuRef}>
      <div className="flex flex-col bg-white shadow-lg p-4 rounded-lg w-64 absolute right-0 mt-2">
        <div className="flex mb-2">
          <img
            src={userdetail?.file || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <div className="ms-4 mt-5">
            <h1 className="text-2xl font-bold">{userdetail?.username || "Guest"}</h1>
            <Link to="/profile">
              <h1 className="text-sm text-blue-500 hover:underline cursor-pointer">
                View Profile
              </h1>
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <h1 className="text-lg font-semibold hover:bg-gray-100 w-full py-2 text-center cursor-pointer">
                {link.label}
              </h1>
            </Link>
          ))}

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
