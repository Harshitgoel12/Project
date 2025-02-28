import React,{useContext, useEffect, useRef, useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import ShowManu from './ShowManu';
import context from '../createcontext';
import RecruiterPage from '../RecruiterComponent/RecruiterPage';
import NormalHeader from '../UserComponent/NormalHeader';
import Profile from '../Profile';
import ShowProfile from '../ShowProfile';

function Header() {
  const [user, setUser] = useState(null);
  const [image,setImage]=useState(false);
  const [isOpen, setOpen] = useState(false);
  const [handleprofile,setHandleProfile]=useState(false);
  const {islogin,setIslogin}=useContext(context);
     const ref=useRef();
  useEffect(() => {
      const storedUser = localStorage.getItem("userdetail");
      if (islogin) {
        setUser(JSON.parse(storedUser));
      }

  }, [islogin]);

  const handleburger = () => {
    setOpen(!isOpen);
  };
  function handleProfile(){
       setHandleProfile(!handleprofile);
  }

  function handleImageClick(e){
setImage(!image);
  }

  return (
    <div className='relative '>
      <div className='flex justify-between overflow-hidden'>
        <h2 className='text-3xl font-bold mt-3 sm:ms-24 ms-12'>
          Job <span className='text-red-500'>Portal</span>
        </h2>
        {!islogin ? (
          <div className='flex  me-10'>
            <div className='gap-6 mt-3 cursor-pointer hidden md:flex'>
              <Link to={'/'}><h3 className='font-semibold mt-2 cursor-pointer'>Home</h3></Link>
              <Link to={"/jobs"}><h3 className='font-semibold mt-2 cursor-pointer'>Jobs</h3></Link>
              <Link to={"/browser"}><h3 className='font-semibold mt-2 cursor-pointer'>Browser</h3></Link>
              <Link to={'/login'}>
                <button className='px-5 py-2 bg-purple-50 rounded-lg border font-semibold hover:bg-purple-100 cursor-pointer'>
                  Login
                </button>
              </Link>
              <Link to={'/signup'}>
                <button className='bg-purple-600 px-4 py-2 text-white font-semibold rounded-lg inline-flex cursor-pointer hover:bg-purple-800'>
                  Signup
                </button>
              </Link>
            </div>
            <GiHamburgerMenu className='mt-5 text-2xl block md:hidden' onClick={handleburger} />
          </div>
        ) : (
          <>
          <div className=' gap-20 hidden md:flex'>
         {user?.role=="recruiter"?<RecruiterPage/>:<NormalHeader/>}
         <div className="font-semibold mt-3  " onClick={handleImageClick}>
         <img src={user?.file||"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}  className='h-10 w-10 rounded-2xl me-10'/>
       </div>
       </div>
        <GiHamburgerMenu className='mt-5 text-2xl block md:hidden me-12'  onClick={handleProfile} />
        </>
        )}
      </div>
     <div >
     {islogin&&image&&<Profile user={user} />}
  
     </div>

    {user?.role=="recruiter"&&handleprofile&&<ShowProfile user={user} data={["my Job","Add Job", "Applied Student"]}
    setHandleProfile={setHandleProfile}/>}
    {user?.role=="student"&&handleprofile&&<ShowProfile user={user} data={["Applied Job","Job","Status"]} setHandleProfile=
    {setHandleProfile}/>}
      {isOpen && <ShowManu/>}
    </div>
  );
}

export default Header;


