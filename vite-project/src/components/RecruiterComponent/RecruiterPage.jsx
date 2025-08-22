import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RecruiterPage() {
  const location = useLocation(); // to highlight active link

  const links = [
    { path: '/', label: 'Home' },
    { path: '/my-job', label: 'Posted Jobs' },
    { path: '/postjob', label: 'Post Job' },
    { path: '/AppliedStudent', label: 'Applicants' },
    { path: '/Shortlisted', label: 'Shortlisted Candidates' },
  ];

  return (
    <nav className="flex flex-wrap gap-4 mt-5 ml-7">
      {links.map((link, idx) => (
        <Link key={idx} to={link.path}>
          <div
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition 
              ${location.pathname === link.path 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`
            }
          >
            {link.label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default RecruiterPage;
