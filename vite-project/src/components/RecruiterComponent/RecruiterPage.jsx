import React from 'react'
import { Link } from 'react-router-dom'

function RecruiterPage() {
  return (
    <div className='flex gap-6 mt-5 ms-32'>
       <Link to={'/'}><h1 className='font-semibold'>Home</h1></Link>
          <Link to={'/my-job'}><h1 className='font-semibold'>My Jobs</h1></Link>
    <Link to={'/postjob'}><h1 className='font-semibold'>Add Jobs</h1></Link>
    <Link to={'/AppliedStudent'}><h1 className='font-semibold'>Applied student</h1></Link>
    <Link to={'/'}><h1 className='font-semibold'>Shortlisted Student</h1></Link>
    </div>
  )
}

export default RecruiterPage
