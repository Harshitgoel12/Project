import React from 'react'
import { Link } from 'react-router-dom'
function NormalHeader() {
 
  return (
    <div className='flex me-8'>
            <div className='gap-6 mt-3 cursor-pointer hidden md:flex'>
            <Link to={'/'}><h3 className='font-semibold mt-2 cursor-pointer'>Home</h3></Link>
              <Link to={'/MyAppliedJobs'}><h3 className='font-semibold mt-2 cursor-pointer'>Applied Job</h3></Link>
              <Link to={"/jobs"}><h3 className='font-semibold mt-2 cursor-pointer'>Search Job</h3></Link>
              <Link to={"/browser"}><h3 className='font-semibold mt-2 cursor-pointer'>Shortlisted Companies</h3></Link>
             
            </div>
           
          </div>
  )
}

export default NormalHeader
