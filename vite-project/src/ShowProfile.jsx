import React, { useContext, useEffect, useRef } from 'react'
import { Link, useFetcher } from 'react-router-dom';
import context from './createcontext';
function ShowProfile({user,data,setHandleProfile}) {
    console.log(data);
    const {islogin,setIslogin}=useContext(context)
    const manuRef=useRef(null);
  function handleLogout(){
    console.log("logout")
    localStorage.removeItem("userdetail");
    localStorage.removeItem("islogin");
    setIslogin(false);
  }



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
  }, []);
  return (
    <div className='w-full flex flex-col items-end relative' >
  <div className=" flex  flex-col    bg-white shadow-lg p-4 rounded-lg w-64 absolute right-0 mt-2" ref={manuRef}>
    <div className='flex '>
    <img 
      src={user?.file || "https://via.placeholder.com/80"} 
      alt="Profile" 
      className="w-20 h-20   rounded-full mb-2 border"
    />
    <div>
    <h1 className='mt-5 ms-4 text-2xl font-bold'>{user.username}</h1>
    <h1 className=' ms-4 text-sm text-blue-500 hover:underline cursor-pointer'>View Profile</h1>
    </div>
</div>
     <div className='flex flex-col items-center gap-2'>
      <Link to={"/login"}><h1 className="text-lg font-semibold hover:bg-gray-100 w-full py-3 text-center">{data[0]}</h1></Link>
      <h1 className="cursor-pointer font-semibold  hover:bg-gray-100 w-full py-3 text-center">{data[1]}</h1>
      <h1 className="cursor-pointer font-semibold  hover:bg-gray-100 w-full py-3 text-center">{data[2]}</h1>
     
    <button 
      className="mt-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      onClick={handleLogout}
    >
      Logout
    </button>
    </div>
  </div>
  </div>
  )
}

export default ShowProfile
