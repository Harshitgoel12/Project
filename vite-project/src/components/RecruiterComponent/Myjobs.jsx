import React from "react";
import { Link } from "react-router-dom";

function Myjobs({ data }) {
  return (
    <div className="mt-10 mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {data.map((ele, idx) => {
        const dis = ele.Description.substr(0, 80);
        return (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-5 w-full max-w-[340px] transform hover:scale-105 transition duration-300"
          >
            {/* Company Logo & Name */}
            <div className="flex items-center gap-4">
              <img
                src={ele.logo}
                className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-gray-300 shadow-sm"
                alt="Company Logo"
              />
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                {ele.ComponyName || "Google"}
              </h1>
            </div>

            {/* Job Title */}
            <h1 className="text-md md:text-lg font-semibold text-gray-700 mt-2">
              {ele.Title}
            </h1>

            {/* Job Description */}
            <p className="text-gray-600 text-sm mt-2">{dis}...</p>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-red-600 font-semibold px-3 py-1 border border-red-500 rounded-lg text-xs">
                {ele.Position} Positions
              </span>
              <span className="text-blue-600 font-semibold px-3 py-1 border border-blue-500 rounded-lg text-xs">
                {ele.JobType}
              </span>
              <span className="text-purple-600 font-semibold px-3 py-1 border border-purple-500 rounded-lg text-xs">
                {ele.Salary}
              </span>
            </div>

            {/* View Details Button */}
            <Link to={`/details/${ele._id}`}>
              <div className="bg-black text-white font-semibold text-center py-2 mt-4 rounded-lg hover:bg-gray-800 transition">
                View Details
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Myjobs;

