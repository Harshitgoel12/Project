import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";

function ShortlistedCandidates() {
  const [alluser, setAllUser] = useState([]);

  async function fetchAppliedStudents() {
    try {
      const response = await axios.get("http://localhost:3000/api/AllAppliedUser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

       console.log("API Response:", response.data.data.data);

      if (response.data?.success && response.data?.data) {
        setAllUser(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching applied students:", error);
    }
  }

  useEffect(() => {
    fetchAppliedStudents();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold font-mono text-center mt-6 mb-3">Dashboard</h1>
      <div className="w-full px-2 sm:px-6">
        {/* Scrollable table on smaller screens */}
        <div className="overflow-x-auto h-screen">
          <Table className="w-full min-w-max shadow-lg rounded-lg overflow-hidden border border-gray-300 ">
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">S.No</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Company Logo</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Company</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Job Title</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Salary</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">Shortlisted Candidates</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">View Shortlisted Applicants</TableHead>
                <TableHead className="text-center text-lg font-semibold p-2 whitespace-nowrap">View Job Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="shadow-lg">
              {alluser?.map((job, idx) => (
              
                <TableRow key={job._id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                  <TableCell className="text-center text-lg font-medium p-2">{idx + 1}</TableCell>
                  <TableCell className="flex justify-center py-2">
                    <img
                      src={job?.logo || "https://via.placeholder.com/50"}
                      alt="Company Logo"
                      className="w-12 h-12 rounded-full border border-gray-400 shadow-sm max-w-full"
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium text-gray-800 p-2">{job?.ComponyName || "N/A"}</TableCell>
                  <TableCell className="text-center text-gray-700 p-2">{job?.Title}</TableCell>
                  <TableCell className="text-center text-gray-700 p-2">{job?.Salary || "Not disclosed"}</TableCell>
                  <TableCell className="text-center text-gray-700 p-2">{job?.Selected?.length || 0}</TableCell>
                 
                  <TableCell className="text-center p-2">
                    <Link
                      to={`/ShowShortlistedCandidates/${job._id}`}
                      className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                    >
                      View
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Link
                      to={`/details/${job._id}`}
                      className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                    >
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

export default ShortlistedCandidates;


