import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function ShortlistedCompony() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/ShortlistedCompony", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setUserId(response.data.userid);
      setData(response.data.data.Apply);
    } catch (error) {
      console.error("Error fetching shortlisted company data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
let cnt=1;
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold font-mono text-center mt-8 mb-3">Shortlisted Compony</h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full shadow-lg rounded-lg border border-gray-300">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead className="w-12 text-center text-lg font-semibold">S.No</TableHead>
              <TableHead className="w-1/6 text-lg font-semibold">Company Logo</TableHead>
              <TableHead className="w-1/6 text-lg font-semibold">Company Name</TableHead>
              <TableHead className="w-1/6 text-lg font-semibold">Role</TableHead>
              <TableHead className="w-1/6 text-lg font-semibold">Salary</TableHead>
              <TableHead className="w-1/6 text-lg font-semibold">View Job Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((job, idx) => 
              job.Selected.includes(userId) && (
                <TableRow key={job.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                  <TableCell className="text-center text-lg font-medium">{cnt++}</TableCell>
                  
                  <TableCell className="flex  justify-start ms-6 py-2">
                    <img src={job.logo} alt="Company Logo" className="w-12 h-12 rounded-full  border border-gray-400 shadow-sm" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-800 whitespace-nowrap ">{job.ComponyName}</TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{job.Title}</TableCell>
                  <TableCell className="text-gray-700 font-semibold whitespace-nowrap">{job.Salary}</TableCell>
                  <TableCell className="text-center">
                    <a href={`/details/${job._id}`} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline hover:text-blue-800">
                      View
                    </a>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ShortlistedCompony;
