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
import { Link } from 'react-router-dom';

function AppliedStudent() {
  const [alluser,setAllUser]=useState([]);
  async function AppliedStudent(){
    try {
      const data=await axios.get("http://localhost:3000/api/AllAppliedUser",{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
      })
      console.log(data.data.data);
      let allUserApplied = [];
data.data.data.data.forEach(item => {
  if (item.UserApplied) {
    allUserApplied = [...allUserApplied, ...item.UserApplied];
    console.log(allUserApplied)
  }
});
     setAllUser([...allUserApplied]);
    } catch (error) {
      console.log("something went wrong while fetching the data",error);
    }
  }
  useEffect(()=>{
    console.log("all user is ",alluser)
  },[alluser])
  useEffect(()=>{
    AppliedStudent();
   
  },[])
 return (
         <>
         <h1 className="text-2xl font-semibold font-mono text-center mt-6 mb-3">Applied Jobs</h1>
         <div className="w-screen  sm:px-6 ">
           <div className="overflow-x-auto">
             <Table className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-300">
              
               <TableHeader className="bg-gray-300">
                 <TableRow>
                   <TableHead className="w-12 text-center text-lg font-semibold">S.No</TableHead>
                   <TableHead className="w-1/6 text-lg font-semibold">Image</TableHead>
                   <TableHead className="w-1/6 text-lg font-semibold">Username</TableHead>
                   <TableHead className="w-1/6 text-lg font-semibold">Email</TableHead>
                   <TableHead className="w-1/6 text-lg font-semibold">Job Status</TableHead>
                   <TableHead className="w-1/6 text-lg font-semibold">Applied For</TableHead>
                   <TableHead className="text-right w-1/6 text-lg font-semibold">View Profile</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {alluser?.map((job, idx) => (
                   <TableRow key={job.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                     <TableCell className="text-center text-lg font-medium">{idx + 1}</TableCell>
                     <TableCell className="flex justify-center py-2">
                       <img src={job.file} alt="Company Logo" className="w-12 h-12 rounded-full border border-gray-400 shadow-sm" />
                     </TableCell>
                     <TableCell className="font-medium text-gray-800 text-nowrap">{job.username}</TableCell>
                     <TableCell className="text-gray-700 text-nowrap">{job.email}</TableCell>
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
                     <TableCell className="text-right">
                       <Link to={"/ViewUserProfile/"+job._id} rel="noopener noreferrer"
                         className="text-blue-600 font-semibold hover:underline hover:text-blue-800 me-7">
                         View 
                       </Link>
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

export default AppliedStudent
