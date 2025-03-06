import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "@chakra-ui/react";

function ViewAppliedApplicant() {
  const params = useParams();
  const [userData, setUserData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [jobid, setJobId] = useState(null);

  async function fetchAllUser() {
    try {
      const data  = await axios.get(
        `http://localhost:3000/api/AppliedUser/${params.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRejected(data.data.data.Rejected);
      setSelected(data.data.data.Selected);
      setJobId(data.data.jobId);
      setUserData(data.data.result);
    } catch (error) {
      console.log(
        "Error while fetching data of all users applied for a particular job:",
        error
      );
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
      setSelected([...data.data.Selected]);
      setRejected([...data.data.Rejected]);
    } catch (error) {
      console.log(
        "Error while handling selection and rejection:",
        error
      );
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold font-mono text-center mt-6 mb-3">
        Recruiter Dashboard
      </h1>
      <div className="min-h-screen w-full px-2 sm:px-6">
        {/* Responsive Scrollable Table */}
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
            <TableBody className="shadow-lg">
              {userData?.map((job, idx) => (
                <TableRow
                  key={job._id}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition"
                >
                  <TableCell className="text-center text-lg font-medium p-2">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="flex justify-center py-2">
                    <img
                      src={job?.file || "https://via.placeholder.com/50"}
                      alt="User"
                      className="w-12 h-12 rounded-full border border-gray-400 shadow-sm object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium text-gray-800 p-2">
                    {job?.username || "N/A"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 p-2">
                    {job?.email}
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Link
                      to={job?.Resume}
                      className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
                    >
                      Resume
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-gray-700 p-2">
                    {job?.LinkedIn || "Not disclosed"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 p-2">
                    {job?.Github}
                  </TableCell>

                  <TableCell className="text-center p-2">
                    {selected.includes(job?._id) ? (
                      <span className="w-20 p-2 bg-green-600 text-white font-semibold text-lg rounded-md">
                        Selected
                      </span>
                    ) : rejected.includes(job?._id) ? (
                      <span className="w-20 p-2 bg-red-600 text-white font-semibold text-lg rounded-md">
                        Rejected
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          className="text-white bg-green-500 hover:bg-green-700 font-semibold px-4 py-2 rounded-md"
                          onClick={() =>
                            handleShortlist("Selected", job?._id, jobid)
                          }
                        >
                          Select
                        </Button>
                        <Button
                          className="text-white bg-red-500 hover:bg-red-700 font-semibold px-4 py-2 rounded-md"
                          onClick={() =>
                            handleShortlist("Rejected", job?._id, jobid)
                          }
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
    </>
  );
}

export default ViewAppliedApplicant;

