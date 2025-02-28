import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

 function DetailsofJob() {
    const {id}=useParams();
    const [job,setJob]=useState(null);
   async function fun(){ 
   try {
     const result= await axios.get("http://localhost:3000/api/getDetails/"+id,{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
     })
     setJob(result.data.data);
     console.log(result.data.data);
   } catch (error) {
    console.log("something went wrong while fatching particular job data form the jobs details",error)
   }
  }
  useEffect(()=>{
         fun();
  },[])
  if(job==null)return <h1>something went wrong </h1>
  return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Header with Job Title & Company */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{job.Title}</h1>
        <img src={job.logo || "https://source.unsplash.com/random/?office"} 
             alt="Company Logo" className="w-20 h-20  rounded-xl" />
      </div>

      {/* Job Info Section */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
        <p><strong>Company:</strong> {job.ComponyName}</p>
        <p><strong>Location:</strong> {job.Location}</p>
        <p><strong>Salary:</strong> {job.Salary ? `${job.Salary}` : "Not Disclosed"}</p>
        <p><strong>Job Type:</strong> {job.JobType || "Full-time"}</p>
        <p><strong>Positions:</strong> {job.Position || "NA"}</p>
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700">{job.Description}</p>
      </div>

       {/* Requirements*/}
       <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <p className="text-gray-700">{job.Requirements}</p>
      </div>

      {/* Skills Required */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition">
          Apply Now
        </button>
      </div>
    </div>
   )
}

export default DetailsofJob


