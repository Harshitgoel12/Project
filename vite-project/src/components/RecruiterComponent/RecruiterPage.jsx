import React from 'react'
import { Link } from 'react-router-dom'

function RecruiterPage() {
  return (
    <div className='flex gap-5 mt-5 ms-28'>
       <Link to={'/'}><h1 className='font-semibold'>Home</h1></Link>
          <Link to={'/my-job'}><h1 className='font-semibold'>Posted Jobs</h1></Link>
    <Link to={'/postjob'}><h1 className='font-semibold'>Post Job</h1></Link>
    <Link to={'/AppliedStudent'}><h1 className='font-semibold'>Applicants</h1></Link>
    <Link to={'/'}><h1 className='font-semibold'>Shortlisted Candidates</h1></Link>
    </div>
  )
}

export default RecruiterPage
