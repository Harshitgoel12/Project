import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailsofJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  async function fetchJobDetails() {
    try {
      const result = await axios.get(`http://localhost:3000/api/getDetails/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setJob(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  useEffect(() => {
    fetchJobDetails();

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (appliedJobs.includes(id)) setIsApplied(true);
  }, [id]);

  async function handleApply() {
    try {
      const result = await axios.put(`http://localhost:3000/api/ApplyJob/${id}`, {}, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
      if (!appliedJobs.includes(result.data.id.id)) {
        appliedJobs.push(result.data.id.id);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }

  if (!job)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        Loading job details...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{job.Title}</h1>
          <p className="text-gray-600 mt-1">{job.ComponyName}</p>
        </div>
        <img
          src={job.logo || "https://source.unsplash.com/random/?office"}
          alt="Company Logo"
          className="w-24 h-24 rounded-xl object-cover shadow-md"
        />
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg shadow-inner">
        <p><strong>Location:</strong> {job.Location || "Remote"}</p>
        <p><strong>Salary:</strong> {job.Salary || "Not Disclosed"}</p>
        <p><strong>Job Type:</strong> {job.JobType || "Full-time"}</p>
        <p><strong>Positions:</strong> {job.Position || "N/A"}</p>
      </div>

      {/* Job Description */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Job Description</h2>
        <p className="text-gray-700">{job.Description}</p>
      </section>

      {/* Requirements */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Requirements</h2>
        <p className="text-gray-700">{job.Requirements}</p>
      </section>

      {/* Skills */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills Required</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Apply Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all
            ${isApplied
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
            }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

export default DetailsofJob;
