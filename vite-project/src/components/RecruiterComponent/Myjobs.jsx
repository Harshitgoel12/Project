import React from 'react'
import { Link } from 'react-router-dom';

function Myjobs({data}) {
  console.log(data);
  return (
    <div className='mt-10  md:gap-6 gap-2  mx-1  flex flex-wrap justify-center lg:justify-normal'>
   {data.map((ele,idx)=>{
   const dis= ele.Description.substr(0,80);
   return  (<div className=' mt-2 rounded-xl md:mt-10  p-3 sm:p-6 shadow-lg w-80  '>
        <div className='flex sm:flex-row flex-col  sm:gap-6 sm:justify-normal items-center '>
        <img src={ele.logo} className=' h-16 w-16 md:h-20 md:w-30 rounded-full' alt="" />
        <h1 className='sm:mt-6 text-lg md:text-2xl font-bold'>{ele.ComponyName||"google"}</h1>
        </div>
        <h1 className=' sm:text-start text-center  text-md md:text-xl font-semibold'>{ele.Title}</h1>
        <h1 className='  p-2 sm:p-4'>{dis}...</h1>
        <div className='flex '>
        <h1 className='text-red-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg '>{ele.Position} Positions</h1>
        <h1 className='text-blue-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg'>{ele.JobType}</h1>
        <h1 className='text-purple-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg'>{ele.Salary}</h1>
        </div>
        <Link to={"/details/"+ele._id}><div className='bg-black text-white font-semibold  text-md sm:text-lg py-2 text-center rounded-lg'>Details</div></Link>
     </div>)
     })}
    </div>
  )
}

export default Myjobs
