import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from '@chakra-ui/react';

function ViewAppliedApplicant() {
    const params=useParams();
    const [userData, setUserData]=useState([]);
    const [jobid,setJobId]=useState(null);
    async  function fetchAllUser(){
        try {
        const data= await axios.get("http://localhost:3000/api/AppliedUser/"+params.id,
            {headers:{"Content-Type":"application/json"},
            withCredentials:true,
        }
        )
             console.log(data.data)
             setJobId(data.data.jobId);
             setUserData(data.data.result);
        } catch (error) {
            console.log("something went wrong while fetching data of all user applied for a particular job",error)
        }
    }
    useEffect(()=>{
          fetchAllUser();
    },[])




   return ( <>
    <h1 className="text-2xl font-semibold font-mono text-center mt-6 mb-3">Dashboard</h1>
    <div className="w-full px-2 sm:px-6">
      {/* Scrollable table on smaller screens */}
      <div className="overflow-x-auto h-screen">
        <Table className="w-full min-w-max shadow-lg rounded-lg overflow-hidden border border-gray-300 ">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">S.No</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">User Image</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Username</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Email</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Resume</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">LinkedIn</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">GitHub</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="shadow-lg">
            {userData?.map((job, idx) => (
            
              <TableRow key={job._id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                <TableCell className="text-center text-lg font-medium p-2">{idx + 1}</TableCell>
                <TableCell className="flex justify-center py-2">
                  <img
                    src={job?.file || "https://via.placeholder.com/50"}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full border border-gray-400 shadow-sm max-w-full"
                  />
                </TableCell>
                <TableCell className="text-center font-medium text-gray-800 p-2">{job?.username || "N/A"}</TableCell>
                <TableCell className="text-center text-gray-700 p-2">{job?.email}</TableCell>
                <TableCell className="text-center p-2">
                  <Link
                    to={job?.Resume}
                    className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                  >
                    Resume
                  </Link>
                </TableCell>
                <TableCell className="text-center text-gray-700 p-2">{job?.LinkedIn || "Not disclosed"}</TableCell>
                <TableCell className="text-center text-gray-700 p-2">{job?.Github}</TableCell>
               
               
                <TableCell className="text-center p-2">
                  <Button
                   
                    className="text-green-600 border-2  px-2 border-green-600  font-semibold text-lg  hover:bg-green-600 hover:text-white"
                 
                  >
                   Select
                  </Button>
                  <Button
            className="text-red-500 text-lg border-2  px-2 border-red-600 font-semibold  hover:bg-red-600 hover:text-white ms-3"
                  > Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

  </>
  )
}

export default ViewAppliedApplicant
