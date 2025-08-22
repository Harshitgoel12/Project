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
import { CircularProgress } from "@mui/material";

function ShortlistedCandidates() {
  const [alluser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      console.error("Error fetching applied students:", err);
      setError("Failed to fetch shortlisted candidates.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAppliedStudents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">{error}</div>
    );
  }

  if (alluser?.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-xl font-semibold">No Shortlisted Candidates Yet</h2>
        <p className="mt-2">Shortlist candidates after reviewing applications.</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen  px-4 sm:px-6 md:px-10 mt-16">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Shortlisted Candidates Dashboard</h1>
      <div className="overflow-x-auto">
        <Table className="w-full min-w-max shadow-lg rounded-lg overflow-hidden border border-gray-300">
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
          <TableBody>
            {alluser.map((job, idx) => (
              <TableRow key={job._id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                <TableCell className="text-center font-medium p-2">{idx + 1}</TableCell>
                <TableCell className="flex justify-center p-2">
                  <img
                    src={job?.logo || "https://via.placeholder.com/50"}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full border border-gray-400 shadow-sm"
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
  );
}

export default ShortlistedCandidates;
