import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"

function MyAppliedJobs() {
    const [data,setData]=useState([]);
async function AppliedJobs(){
try {
    const data= await axios.get("http://localhost:3000/api/AppliedJobs",{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
    })
    console.log(data.data.result)
    setData(data.data.result)

} catch (error) {
    console.log("something went wrong while fatching the data",error)
}
}
    useEffect(()=>{
        AppliedJobs();

    })

       
    return (
        <>
        <h1 className="text-2xl font-semibold font-mono text-center mt-6 mb-3">Applied Jobs</h1>
        <div className="w-screen  sm:px-6 ">
          <div className="overflow-x-auto">
            <Table className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-300">
             
              <TableHeader className="bg-gray-300">
                <TableRow>
                  <TableHead className="w-12 text-center text-lg font-semibold">S.No</TableHead>
                  <TableHead className="w-1/6 text-lg font-semibold">Company Logo</TableHead>
                  <TableHead className="w-1/6 text-lg font-semibold">Company Name</TableHead>
                  <TableHead className="w-1/6 text-lg font-semibold">Role</TableHead>
                  <TableHead className="w-1/6 text-lg font-semibold">Job Status</TableHead>
                  <TableHead className="text-right w-1/6 text-lg font-semibold">View Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((job, idx) => (
                  <TableRow key={job.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                    <TableCell className="text-center text-lg font-medium">{idx + 1}</TableCell>
                    <TableCell className="flex justify-center py-2">
                      <img src={job.logo} alt="Company Logo" className="w-12 h-12 rounded-full border border-gray-400 shadow-sm" />
                    </TableCell>
                    <TableCell className="font-medium text-gray-800 text-nowrap">{job.ComponyName}</TableCell>
                    <TableCell className="text-gray-700 text-nowrap">{job.Title}</TableCell>
                    <TableCell className="text-gray-700 font-semibold">
                      <span className={`px-3 py-1 rounded-full text-white text-sm 
                        ${job.Status === "Accepted" ? "bg-green-500" : job.Status === "Rejected" ? "bg-red-500" : "bg-yellow-500"}`}>
                        {job.Status || "Pending"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <a href={"/details/"+job._id} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline hover:text-blue-800 me-7">
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        </>
      );
      
      
      
}

export default MyAppliedJobs
