import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Myjobs from './Myjobs';
import { CircularProgress } from '@mui/material'; // optional spinner

function MyPostedJob() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchJobs() {
    try {
      const result = await axios.get("http://localhost:3000/api/myjobs", { withCredentials: true });
      console.log(result);
      setData(result.data);
    } catch (err) {
      console.error("Error fetching posted jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
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
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Posted Jobs</h1>
      {data?.data?.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <h2 className="text-xl font-semibold">No Jobs Posted Yet</h2>
          <p className="mt-2">You haven’t posted any jobs. Click “Post a Job” to get started.</p>
        </div>
      ) : (
        <Myjobs data={data.data} />
      )}
    </div>
  );
}

export default MyPostedJob;
