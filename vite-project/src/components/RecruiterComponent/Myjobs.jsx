import React from "react";
import { Link } from "react-router-dom";

function Myjobs({ data = [] }) {
  return (
    <div className="mt-10 mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {data.map((ele, idx) => {
        const shortDescription =
          ele.Description?.length > 100
            ? ele.Description.substr(0, 100) + "..."
            : ele.Description || "No Description";

        return (
          <div
            key={ele._id || idx}
            className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-[340px] transform hover:scale-105 transition duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            {/* Header: Company Logo & Name */}
            <div className="flex items-center gap-4 mb-3">
              <img
                src={ele.logo || "https://via.placeholder.com/80"}
                className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-gray-300 shadow-sm object-cover"
                alt={`${ele.ComponyName || "Company"} Logo`}
              />
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                {ele.ComponyName || "Company Name"}
              </h1>
            </div>

            {/* Job Title */}
            <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-2">
              {ele.Title || "Title Not Available"}
            </h2>

            {/* Job Description */}
            <p className="text-gray-600 text-sm mb-3">{shortDescription}</p>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ele.Position && (
                <span className="text-red-600 font-semibold px-3 py-1 border border-red-500 rounded-full text-xs">
                  {ele.Position} Position{ele.Position > 1 ? "s" : ""}
                </span>
              )}
              {ele.JobType && (
                <span className="text-blue-600 font-semibold px-3 py-1 border border-blue-500 rounded-full text-xs">
                  {ele.JobType}
                </span>
              )}
              {ele.Salary && (
                <span className="text-purple-600 font-semibold px-3 py-1 border border-purple-500 rounded-full text-xs">
                  {ele.Salary}
                </span>
              )}
            </div>

            {/* Actions */}
            <Link to={`/details/${ele._id}`} className="mt-auto">
              <button className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition">
                View Details
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Myjobs;
