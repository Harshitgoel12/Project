import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CircularProgress } from "@mui/material";

function ShowSelectedCandidates() {
  const params = useParams();
  const [userData, setUserData] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchAllUser() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/AppliedUser/${params.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setJobId(data.data.jobId);
      setUserData(data.data.data.Selected);
    } catch (err) {
      console.log("Error fetching applied users:", err);
      setError("Failed to fetch selected candidates.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUser();
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

  if (!userData || userData.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-xl font-semibold">No Candidates Selected Yet</h2>
        <p className="mt-2">Shortlist candidates after reviewing applications.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Shortlisted Candidates
      </h1>
      <div className="overflow-x-auto max-h-[80vh] border border-gray-300 rounded-lg">
        <Table className="w-full min-w-max shadow-lg">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead className="text-center text-lg font-semibold p-2">S.No</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">User Image</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">Username</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">Email</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">Resume</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">LinkedIn</TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">GitHub</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user, idx) => (
              <TableRow key={user._id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                <TableCell className="text-center font-medium p-2">{idx + 1}</TableCell>
                <TableCell className="flex justify-center p-2">
                  <img
                    src={user?.file || "https://via.placeholder.com/50"}
                    alt="User"
                    className="w-12 h-12 rounded-full border border-gray-400 shadow-sm object-cover"
                  />
                </TableCell>
                <TableCell className="text-center font-medium text-gray-800 p-2">{user?.username || "N/A"}</TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.email}</TableCell>
                <TableCell className="text-center p-2">
                  <Link
                    to={user?.Resume}
                    className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                  >
                    Resume
                  </Link>
                </TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.LinkedIn || "Not disclosed"}</TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.Github || "Not disclosed"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ShowSelectedCandidates;
