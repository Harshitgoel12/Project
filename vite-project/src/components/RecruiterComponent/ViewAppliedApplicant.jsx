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
import { Button, Spinner, Center } from "@chakra-ui/react";

function ViewAppliedApplicant() {
  const params = useParams();
  const [userData, setUserData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAllUser() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/AppliedUser/${params.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRejected(data.data.data.Rejected || []);
      setSelected(data.data.data.Selected || []);
      setJobId(data.data.jobId);
      setUserData(data.data.result || []);
    } catch (err) {
      console.log("Error fetching applicants:", err);
      setError("Failed to fetch applicants. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, []);

  async function handleShortlist(status, userid, jobid) {
    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/Shortlising",
        { status, jobid, userid },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSelected(data.data.Selected || []);
      setRejected(data.data.Rejected || []);
    } catch (err) {
      console.log("Error updating shortlist status:", err);
      setError("Failed to update status. Please try again.");
    }
  }

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!userData.length) {
    return (
      <p className="text-center mt-10 text-gray-600">
        No applicants have applied for this job yet.
      </p>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Recruiter Dashboard
      </h1>
      <div className="overflow-x-auto max-h-[80vh] border border-gray-300 rounded-lg">
        <Table className="w-full min-w-max shadow-lg">
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead className="text-center text-lg font-semibold p-2">
                S.No
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                User Image
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                Username
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                Email
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                Resume
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                LinkedIn
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                GitHub
              </TableHead>
              <TableHead className="text-center text-lg font-semibold p-2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user, idx) => (
              <TableRow
                key={user._id}
                className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition"
              >
                <TableCell className="text-center font-medium p-2">{idx + 1}</TableCell>
                <TableCell className="flex justify-center p-2">
                  <img
                    src={user?.file || "https://via.placeholder.com/50"}
                    alt={user?.username || "User"}
                    className="w-12 h-12 rounded-full border border-gray-400 shadow-sm object-cover"
                  />
                </TableCell>
                <TableCell className="text-center font-medium text-gray-800 p-2">
                  {user?.username || "N/A"}
                </TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.email}</TableCell>
                <TableCell className="text-center p-2">
                  {user?.Resume ? (
                    <Link
                      to={user.Resume}
                      className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                    >
                      View Resume
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.LinkedIn || "Not disclosed"}</TableCell>
                <TableCell className="text-center text-gray-700 p-2">{user?.Github || "Not disclosed"}</TableCell>
                <TableCell className="text-center p-2">
                  {selected.includes(user?._id) ? (
                    <span className="w-20 p-2 bg-green-600 text-white font-semibold text-lg rounded-md">
                      Selected
                    </span>
                  ) : rejected.includes(user?._id) ? (
                    <span className="w-20 p-2 bg-red-600 text-white font-semibold text-lg rounded-md">
                      Rejected
                    </span>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => handleShortlist("Selected", user._id, jobId)}
                      >
                        Select
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleShortlist("Rejected", user._id, jobId)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ViewAppliedApplicant;
