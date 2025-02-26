import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImCross } from "react-icons/im";
function ShowManu() {
   const [show,setShow]=useState(true);
  const ref=useRef();
  function handleshow(e){
    setShow(!show);
  }
   useEffect(() => {
       const handleClickOutside = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
           setShow(false);
         }
       };
   
       document.addEventListener("mousedown", handleClickOutside);
   
       return () => {
         document.removeEventListener("mousedown", handleClickOutside);
       };
     }, []);
  return (
    <div className='relative'>
      {show &&<div className='  overflow-hidden gap-3 mt-3  bg-gray-50 w-full py-2 absolute top-0 right-0' ref={ref}>
       <h1 className='text-end flex justify-end me-12 pt-2  cursor-pointer' onClick={handleshow}><ImCross /></h1>
            <div className=' flex  flex-col  cursor-pointer items-center'>
           
           <Link to="/"><h3 className='font-semibold mt-2 cursor-pointer'>Home</h3></Link>
           <Link to='/jobs'><h3 className='font-semibold mt-2 cursor-pointer'>Jobs</h3></Link>
           <Link to="/browser"><h3 className='font-semibold mt-2 cursor-pointer'>Browser</h3></Link>
           <Link to={'/login'}><button className='px-5 bg-purple-50 rounded-lg  mt-5 border font-semibold hover:bg-purple-100 cursor-pointer'>Login</button>
           </Link>
          <Link to={'/signup'}> <button className='bg-purple-600  px-4 py-2 mt-5 text-white font-semibold  rounded-lg inline-flex items-center cursor-pointer
           hover:bg-purple-800'>Signup</button></Link>
           </div>
           </div>
}
           </div> 
  )
}
export default ShowManu
