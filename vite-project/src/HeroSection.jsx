import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import Scroller from "./Scroller";
function HeroSection(){
    return (
<>
<div className="flex  flex-col my-10 items-center w-full">
<h1 className=" inline-block   bg-gray-100 px-3 py-2 rounded-xl font-bold text-red-500 mt-4">No. 1 Job Hunt Website</h1>
<h1 className="md:text-5xl text-3xl font-bold mt-8 md:ms-1 text-center">Search, Apply &
</h1>
<h1 className="md:text-5xl text-3xl font-bold mt-3 text-center md:st-2">Get Your <span className="text-purple-700">Dream Jobs </span> </h1>
<p className="mt-8 mx-2 p-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
<div className="w-2/3 flex justify-center">
    <input type="search" placeholder="Find your dream jobs" className="mt-8 md:w-1/2 w-full h-10 text-start  rounded-l-xl ps-3 border-none
      shadow-lg" />
     <button className="bg-purple-600 inline-flex items-center justify-center  w-12 h-10 mt-8 rounded-r-xl text-white"  >
  <IoMdSearch className="text-xl" />
</button>
</div>
<div className="flex w-1/2  justify-center mt-8">
<FaArrowRight  className="mt-1" />
<Scroller/>
<FaArrowLeft className="mt-1" />
</div>

</div>
<div className="max-w-7xl mx-auto my-20">
<h1 className="md:text-4xl text-2xl font-bold mt-5  ms-16 md:ms-28"><span className="text-purple-600">Latest & Top </span>Job Openings</h1>
<p className="mt-3 ms-28"> No Job Available</p>
</div>

</>
    )
}
export default HeroSection;
