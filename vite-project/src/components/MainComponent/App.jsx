import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './Footer'
import Header from './Header'
import context from '../createcontext'
import { useEffect, useState } from 'react'
function App() {
  const [islogin,setIslogin]=useState(false);
  useEffect(()=>{
     if(localStorage.getItem("islogin")){
      setIslogin(true);
     }
  },[])
  return (
    <div className="overflow-x-hidden">
      <context.Provider value={{islogin,setIslogin}}>
     <Header/>
     <Outlet/>
     <Footer/>
     </context.Provider>
    </div>
  )
}

export default App
