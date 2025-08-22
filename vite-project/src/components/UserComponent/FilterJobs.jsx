import React, { useState, useEffect } from "react";
import { Label } from "../ui/label.jsx";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";

function FilterJobs({ jobs = [], setFilteredJobs = () => {} }) { // Default to no-op
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const Location = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"];
  const Industry = ["Frontend Developer", "Backend Developer", "Data Science", "Fullstack Developer", "Next.js Developer"];
  const Salary = ["0 - 4k", "42 - 1lakh", "1lakh - 5lakh"];

  // Filter logic
  useEffect(() => {
    if (!Array.isArray(jobs)) return;

    let filtered = [...jobs];

    if (selectedLocation) {
      filtered = filtered.filter(job => job.Location === selectedLocation);
    }

    if (selectedIndustry) {
      filtered = filtered.filter(job => job.JobType === selectedIndustry);
    }

    if (selectedSalary) {
      filtered = filtered.filter(job => {
        const [min, max] = selectedSalary.split(" - ").map(s => parseInt(s.replace(/[^\d]/g, ""), 10));
        const salary = parseInt(job.Salary?.replace(/[^\d]/g, "") || 0, 10);
        return salary >= min && salary <= max;
      });
    }

    setFilteredJobs(filtered);
  }, [selectedLocation, selectedIndustry, selectedSalary, jobs, setFilteredJobs]);

  const renderFilters = (isSmallScreen = false) => (
    <RadioGroup defaultValue="none" className="py-2">
      <h1 className="mt-4 text-lg font-bold text-gray-800">Location</h1>
      {Location.map((ele, idx) => (
        <div className="flex items-center space-x-2 mt-1" key={idx}>
          <RadioGroupItem
            value={ele}
            id={`${isSmallScreen ? "s-" : ""}loc-${idx}`}
            checked={selectedLocation === ele}
            onChange={() => setSelectedLocation(ele)}
          />
          <Label htmlFor={`${isSmallScreen ? "s-" : ""}loc-${idx}`}>{ele}</Label>
        </div>
      ))}

      <h1 className="mt-4 text-lg font-bold text-gray-800">Industry</h1>
      {Industry.map((ele, idx) => (
        <div className="flex items-center space-x-2 mt-1" key={idx}>
          <RadioGroupItem
            value={ele}
            id={`${isSmallScreen ? "s-" : ""}ind-${idx}`}
            checked={selectedIndustry === ele}
            onChange={() => setSelectedIndustry(ele)}
          />
          <Label htmlFor={`${isSmallScreen ? "s-" : ""}ind-${idx}`}>{ele}</Label>
        </div>
      ))}

      <h1 className="mt-4 text-lg font-bold text-gray-800">Salary</h1>
      {Salary.map((ele, idx) => (
        <div className="flex items-center space-x-2 mt-1" key={idx}>
          <RadioGroupItem
            value={ele}
            id={`${isSmallScreen ? "s-" : ""}sal-${idx}`}
            checked={selectedSalary === ele}
            onChange={() => setSelectedSalary(ele)}
          />
          <Label htmlFor={`${isSmallScreen ? "s-" : ""}sal-${idx}`}>{ele}</Label>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="relative">
      {/* Sidebar for Large Screens */}
      <div className="w-80 bg-white shadow-md px-6 py-4 lg:block hidden">
        <h1 className="text-2xl font-bold text-gray-600 whitespace-nowrap">Filter Jobs</h1>
        {renderFilters()}
      </div>

      {/* Hamburger Menu Button for Small Screens */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 border-2 border-pink-200 text-blue-500 rounded-lg z-50 flex items-center justify-center w-10 h-10"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar for Small Screens */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 z-50 transition-transform duration-300 transform translate-x-0">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={28} />
          </button>

          <h1 className="text-2xl font-bold text-gray-700">Filter Jobs</h1>
          {renderFilters(true)}
        </div>
      )}
    </div>
  );
}

export default FilterJobs;
