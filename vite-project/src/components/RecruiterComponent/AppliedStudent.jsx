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

function AppliedStudent() {
  const [alluser, setAllUser] = useState([]);

  async function fetchAppliedStudents() {
    try {
      const response = await axios.get("http://localhost:3000/api/AllAppliedUser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

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
    <div className="min-h-screen px-4 sm:px-8 py-6">
      <h1 className="text-3xl font-bold font-mono text-center mb-6 text-gray-800">
         Dashboard
      </h1>

      <div className="w-full overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <Table className="w-full text-sm sm:text-base">
          {/* Sticky header */}
          <TableHeader className="bg-purple-600 text-white sticky top-0 z-10">
            <TableRow>
              <TableHead className="p-3 text-white text-center font-semibold">#</TableHead>
              <TableHead className="p-3 text-white  text-center font-semibold">Logo</TableHead>
              <TableHead className="p-3 text-white text-center font-semibold">Company</TableHead>
              <TableHead className="p-3 text-white text-center font-semibold">Job Title</TableHead>
              <TableHead className="p-3 text-white text-center font-semibold">Salary</TableHead>
              <TableHead className="p-3 text-white  text-center font-semibold">Applicants</TableHead>
              <TableHead className="p-3 text-white text-center font-semibold">Applicants</TableHead>
              <TableHead className="p-3 text-white text-center font-semibold">Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {alluser?.map((job, idx) => (
              <TableRow
                key={job._id}
                className="odd:bg-gray-50 even:bg-white hover:bg-purple-50 transition-colors duration-200"
              >
                <TableCell className="text-center font-medium">{idx + 1}</TableCell>

                {/* Company Logo */}
                <TableCell className="flex justify-center py-2">
                  <img
                    src={job?.logo || "https://via.placeholder.com/50"}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover"
                  />
                </TableCell>

                {/* Company Info */}
                <TableCell className="text-center font-semibold text-gray-800">
                  {job?.ComponyName || "N/A"}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {job?.Title}
                </TableCell>
                <TableCell className="text-center text-green-600 font-medium">
                  {job?.Salary || "Not disclosed"}
                </TableCell>
                <TableCell className="text-center text-purple-700 font-bold">
                  {job?.UserApplied?.length || 0}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <Link
                    to={`/ViewAppliedApplicants/${job._id}`}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-lg transition"
                  >
                    View
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/details/${job._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {/* Empty state */}
            {alluser?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  🚀 No applied jobs found yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedStudent;
