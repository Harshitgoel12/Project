// import React, { useState } from 'react'
// import { Label } from "../ui/label.jsx"
// import { FiMenu } from "react-icons/fi";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx"
// function FilterJobs() {
//   const Location=["Delhi NCR","Bangalore","Hyderabad","Pune","Chennai","Mumbai"];
//   const Industury=["Frontend Developer","Backend Developer","Data Science","Fullstack Developer","Nextjs Developer"]
//   const Salary=["0 - 4k", "42 - 1lakh","1lakh - 5lakh"];
//   const [isOpen,setIsOpen]=useState(false);
//   return (
//     <div className='relative'>
//     <div className=' w-1/3 xl:w-1/6 bg-white shadow-md ps-6 pe-4 lg:block hidden'>
//       <h1 className='text-2xl font-bold text-gray-600 pt-3'>Filter Jobs</h1>
//       <RadioGroup defaultValue="comfortable">
//         <h1 className='mt-3 text-xl font-bold'>Location</h1>
//          {  Location.map((ele,idx)=>{
//       return <div className="flex items-center space-x-2 mt-1" key={idx}>
//         <RadioGroupItem value={ele} id="r1" />
//         <Label htmlFor="r1">{ele}</Label>
//       </div>
//     })}
//     <h1 className='mt-3 text-xl font-bold'>Industury</h1>
//     {  Industury.map((ele,idx)=>{
//       return <div className="flex items-center space-x-2 mt-1" key={idx}>
//         <RadioGroupItem value={ele} id="r1" />
//         <Label htmlFor="r1">{ele}</Label>
//       </div>
//     })}
//     <h1 className='mt-3 text-xl font-bold'>Salary</h1>
//     {  Salary.map((ele,idx)=>{
//       return <div className="flex items-center space-x-2 mt-1" key={idx}>
//         <RadioGroupItem value={ele} id="r1" />
//         <Label htmlFor="r1">{ele}</Label>
//       </div>
//     })}
//     </RadioGroup>
//     </div>
      
//    {!isOpen &&<button
//   className="lg:hidden absolute top-4 left-0 bg-gray-800 text-white rounded-lg z-50 flex items-center justify-center w-10 h-10"
//   onClick={()=>setIsOpen(!isOpen)}
// >
//   <FiMenu size={24} />
// </button>}
// {isOpen&&<div className="p-6">
//           <h1 className="text-2xl font-bold text-gray-700">Filter Jobs</h1>

//           <RadioGroup defaultValue="comfortable" className="py-2">
//             {/* Location Filter */}
//             <h1 className="mt-4 text-lg font-bold text-gray-800">Location</h1>
//           {Location.map((ele, idx) => (
//               <div className="flex items-center space-x-2 mt-1" key={idx}>
//                 <RadioGroupItem value={ele} id={`loc-${idx}`} />
//                 <Label htmlFor={`loc-${idx}`}>{ele}</Label>
//               </div>
//             ))}

//             {/* Industry Filter */}
//             <h1 className="mt-4 text-lg font-bold text-gray-800">Industry</h1>
//             {Industury.map((ele, idx) => (
//               <div className="flex items-center space-x-2 mt-1" key={idx}>
//                 <RadioGroupItem value={ele} id={`ind-${idx}`} />
//                 <Label htmlFor={`ind-${idx}`}>{ele}</Label>
//               </div>
//             ))}

//             {/* Salary Filter */}
//             <h1 className="mt-4 text-lg font-bold text-gray-800">Salary</h1>
//             {Salary.map((ele, idx) => (
//               <div className="flex items-center space-x-2 mt-1" key={idx}>
//                 <RadioGroupItem value={ele} id={`sal-${idx}`} />
//                 <Label htmlFor={`sal-${idx}`}>{ele}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>
// }
//       </div>
   
//   )
// }

// export default FilterJobs;


// // import React, { useState } from 'react';
// // import { Label } from "../ui/label.jsx";
// // import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
// //  // Hamburger Icon
// // import { IoClose } from "react-icons/io5"; // Close Icon

// // function FilterJobs() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   const Location = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"];
// //   const Industry = ["Frontend Developer", "Backend Developer", "Data Science", "Fullstack Developer", "Next.js Developer"];
// //   const Salary = ["0 - 4k", "42 - 1lakh", "1lakh - 5lakh"];

// //   return (
// //     <div className="relative">
// //       {/* Hamburger Button - Shown only on small screens */}
// //       {!isOpen && (
// //         <button
// //           className="sm:hidden fixed top-4 left-4 bg-gray-800 text-white rounded-lg z-50 flex items-center justify-center w-10 h-10"
// //           onClick={() => setIsOpen(true)}
// //         >
// //           <FiMenu size={24} />
// //         </button>
// //       )}

// //       {/* Sidebar - Always visible on large screens */}
// //       <div
// //         className={`fixed sm:static sm:block sm:w-1/5 sm:h-auto top-0 left-0 h-full w-64 bg-white shadow-md transform ${
// //           isOpen ? "translate-x-0" : "-translate-x-full"
// //         } transition-transform duration-300 sm:translate-x-0`}
// //       >
// //         {/* Close Button - Only for small screens */}
// //         {isOpen && (
// //           <button
// //             className="absolute top-4 right-4 text-gray-600 hover:text-red-500 sm:hidden"
// //             onClick={() => setIsOpen(false)}
// //           >
// //             <IoClose size={28} />
// //           </button>
// //         )}

// //         <div className="p-6">
// //           <h1 className="text-2xl font-bold text-gray-700">Filter Jobs</h1>

// //           <RadioGroup defaultValue="comfortable" className="py-2">
// //             {/* Location Filter */}
// //             <h1 className="mt-4 text-lg font-bold text-gray-800">Location</h1>
// //             {Location.map((ele, idx) => (
// //               <div className="flex items-center space-x-2 mt-1" key={idx}>
// //                 <RadioGroupItem value={ele} id={`loc-${idx}`} />
// //                 <Label htmlFor={`loc-${idx}`}>{ele}</Label>
// //               </div>
// //             ))}

// //             {/* Industry Filter */}
// //             <h1 className="mt-4 text-lg font-bold text-gray-800">Industry</h1>
// //             {Industry.map((ele, idx) => (
// //               <div className="flex items-center space-x-2 mt-1" key={idx}>
// //                 <RadioGroupItem value={ele} id={`ind-${idx}`} />
// //                 <Label htmlFor={`ind-${idx}`}>{ele}</Label>
// //               </div>
// //             ))}

// //             {/* Salary Filter */}
// //             <h1 className="mt-4 text-lg font-bold text-gray-800">Salary</h1>
// //             {Salary.map((ele, idx) => (
// //               <div className="flex items-center space-x-2 mt-1" key={idx}>
// //                 <RadioGroupItem value={ele} id={`sal-${idx}`} />
// //                 <Label htmlFor={`sal-${idx}`}>{ele}</Label>
// //               </div>
// //             ))}
// //           </RadioGroup>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default FilterJobs;











import React, { useState } from "react";
import { Label } from "../ui/label.jsx";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";

function FilterJobs() {
  const [isOpen, setIsOpen] = useState(false);

  const Location = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"];
  const Industry = ["Frontend Developer", "Backend Developer", "Data Science", "Fullstack Developer", "Next.js Developer"];
  const Salary = ["0 - 4k", "42 - 1lakh", "1lakh - 5lakh"];

  return (
    <div className="relative">
      {/* Sidebar for Large Screens */}
      <div className="w-80  bg-white shadow-md px-6 py-4 lg:block hidden">
        <h1 className="text-2xl font-bold text-gray-600 whitespace-nowrap">Filter Jobs</h1>
        <RadioGroup defaultValue="comfortable">
          {/* Location Filter */}
          <h1 className="mt-3 text-xl font-bold">Location</h1>
          {Location.map((ele, idx) => (
            <div className="flex items-center space-x-2 mt-1" key={idx}>
              <RadioGroupItem value={ele} id={`loc-${idx}`} />
              <Label htmlFor={`loc-${idx}`}>{ele}</Label>
            </div>
          ))}

          {/* Industry Filter */}
          <h1 className="mt-3 text-xl font-bold">Industry</h1>
          {Industry.map((ele, idx) => (
            <div className="flex items-center space-x-2 mt-1" key={idx}>
              <RadioGroupItem value={ele} id={`ind-${idx}`} />
              <Label htmlFor={`ind-${idx}`}>{ele}</Label>
            </div>
          ))}

          {/* Salary Filter */}
          <h1 className="mt-3 text-xl font-bold">Salary</h1>
          {Salary.map((ele, idx) => (
            <div className="flex items-center space-x-2 mt-1" key={idx}>
              <RadioGroupItem value={ele} id={`sal-${idx}`} />
              <Label htmlFor={`sal-${idx}`}>{ele}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Hamburger Menu Button for Small Screens */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 border-2 border-pink-200  text-blue-500 rounded-lg z-50 flex items-center justify-center w-10 h-10"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar for Small Screens */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 z-50 transition-transform duration-300 transform translate-x-0">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={28} />
          </button>

          <h1 className="text-2xl font-bold text-gray-700">Filter Jobs</h1>
          <RadioGroup defaultValue="comfortable" className="py-2">
            {/* Location Filter */}
            <h1 className="mt-4 text-lg font-bold text-gray-800">Location</h1>
            {Location.map((ele, idx) => (
              <div className="flex items-center space-x-2 mt-1" key={idx}>
                <RadioGroupItem value={ele} id={`s-loc-${idx}`} />
                <Label htmlFor={`s-loc-${idx}`}>{ele}</Label>
              </div>
            ))}

            {/* Industry Filter */}
            <h1 className="mt-4 text-lg font-bold text-gray-800">Industry</h1>
            {Industry.map((ele, idx) => (
              <div className="flex items-center space-x-2 mt-1" key={idx}>
                <RadioGroupItem value={ele} id={`s-ind-${idx}`} />
                <Label htmlFor={`s-ind-${idx}`}>{ele}</Label>
              </div>
            ))}

            {/* Salary Filter */}
            <h1 className="mt-4 text-lg font-bold text-gray-800">Salary</h1>
            {Salary.map((ele, idx) => (
              <div className="flex items-center space-x-2 mt-1" key={idx}>
                <RadioGroupItem value={ele} id={`s-sal-${idx}`} />
                <Label htmlFor={`s-sal-${idx}`}>{ele}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}

export default FilterJobs;
