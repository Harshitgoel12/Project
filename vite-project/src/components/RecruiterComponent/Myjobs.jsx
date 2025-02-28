import React from 'react'
import { Link } from 'react-router-dom';

function Myjobs({data}) {
  console.log(data);
  return (
    <div className='mt-10 gap-6 ms-10 flex flex-wrap'>
   {data.map((ele,idx)=>{
   const dis= ele.Description.substr(0,80);
   return  (<div className=' mt-10 p-6 shadow-lg w-80'>
        <div className='flex gap-6 '>
        <img src={ele.logo} className='h-20 w-30 rounded-full' alt="" />
        <h1 className='mt-6 text-2xl font-bold'>{ele.ComponyName||"google"}</h1>
        </div>
        <h1 className='text-xl font-semibold'>{ele.Title}</h1>
        <h1 className=' p-4'>{dis}...</h1>
        <div className='flex '>
        <h1 className='text-red-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg '>{ele.Position} Positions</h1>
        <h1 className='text-blue-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg'>{ele.JobType}</h1>
        <h1 className='text-purple-500 font-bold m-2 p-1 border-2  text-sm  rounded-lg'>{ele.Salary}</h1>
        </div>
        <Link to={"/details/"+ele._id}><div className='bg-black text-white font-semibold text-lg py-2 text-center rounded-lg'>Details</div></Link>
     </div>)
     })}
    </div>
  )
}

export default Myjobs
