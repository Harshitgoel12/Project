import React from 'react'
import AllJobs from './AllJobs.jsx'
import FilterJobs from './FilterJobs.jsx'

function Jobs() {
  return (
    <div className='flex sm:gap-5  mt-5 bg-gray-50 min-h-screen'>
    <FilterJobs/>
    <AllJobs/>
    </div>
  )
}

export default Jobs
