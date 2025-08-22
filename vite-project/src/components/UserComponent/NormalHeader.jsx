import React from "react";
import { Link } from "react-router-dom";

function NormalHeader() {
  return (
    <nav className="flex mr-8">
      <div className="gap-6 mt-3 cursor-pointer hidden md:flex">
        <Link to="/">
          <h3 className="font-semibold mt-2 cursor-pointer hover:text-purple-600 transition-colors">
            Home
          </h3>
        </Link>
        <Link to="/MyAppliedJobs">
          <h3 className="font-semibold mt-2 cursor-pointer hover:text-purple-600 transition-colors">
            Applied Job
          </h3>
        </Link>
        <Link to="/jobs">
          <h3 className="font-semibold mt-2 cursor-pointer hover:text-purple-600 transition-colors">
            Search Job
          </h3>
        </Link>
        <Link to="/ShortlistedCompony">
          <h3 className="font-semibold mt-2 cursor-pointer hover:text-purple-600 transition-colors">
            Shortlisted Companies
          </h3>
        </Link>
      </div>
    </nav>
  );
}

export default NormalHeader;
