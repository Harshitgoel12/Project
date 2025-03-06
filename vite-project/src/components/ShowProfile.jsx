import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import context from "./createcontext";

function ShowProfile({ user, data, setHandleProfile,handleprofile }) {
  const { islogin, setIslogin } = useContext(context);
  const [userdetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("userdetail")) || null
  );
  const manuRef = useRef(null);

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("userdetail");
    localStorage.removeItem("islogin");
    setUserDetail(null);
    setIslogin(false);
  }
function handleClickOutside(e){
  if(handleprofile&&!manuRef.current.contains(e.target)){
    setHandleProfile(false);
  }
  
}
useEffect(()=>{
  window.addEventListener("mousedown",handleClickOutside);
})

  return (
    <div className="w-full flex flex-col items-end relative z-50" ref={manuRef}>
      <div
        className="flex flex-col bg-white shadow-lg p-4 rounded-lg w-64 absolute right-0 mt-2"
       
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
            <Link to={"/profile"}><h1 className="ms-4 text-sm text-blue-500 hover:underline cursor-pointer">
              View Profile
            </h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center z-50">
          {user.role=="recruiter"?<>
          <Link to="/">
            <h1 className="text-lg font-semibold hover:bg-gray-100 w-full py-2 text-center">
              {data[0]}
            </h1>
          </Link>
          <Link to={"/my-job"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[1]}
          </h1>
          </Link>
          <Link to={"/postjob"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[2]}
          </h1>
          </Link>
          <Link to={"/AppliedStudent"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[3]}
          </h1>
          </Link>
          <Link to={"/Shortlisted"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[4]}
          </h1>
          </Link>
          </>
          :
          <>
          <Link to="/">
            <h1 className="text-lg font-semibold hover:bg-gray-100 w-full py-2 text-center">
              {data[0]}
            </h1>
          </Link>
          <Link to={"/MyAppliedJobs"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[1]}
          </h1>
          </Link>
          <Link to={"/jobs"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[2]}
          </h1>
          </Link>
          <Link to={"/"}>
          <h1 className="cursor-pointer font-semibold hover:bg-gray-100 w-full py-2 text-center">
            {data[3]}
          </h1>
          </Link>
          </>
          }
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
