//learn about this page


import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Scroller() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-6 gap-4">
     
      <FaArrowLeft className="cursor-pointer text-xl" onClick={() => scroll("left")} />
      <div
        ref={scrollRef}
        className="flex gap-14 w-2/3 overflow-x-hidden justify-start"
      >
        <h1 className="shrink-0 whitespace-nowrap bg-gray-50 px-5 py-2 rounded-2xl">
          Frontend Developer
        </h1>
        <h1 className="shrink-0 whitespace-nowrap bg-gray-50 px-5 py-2 rounded-2xl">
          Backend Developer
        </h1>
        <h1 className="shrink-0 whitespace-nowrap bg-gray-50 px-5 py-2 rounded-2xl">
          Data Science
        </h1>
        <h1 className="shrink-0 whitespace-nowrap bg-gray-50 px-5 py-2 rounded-2xl">
          Graphics Designer
        </h1>
        <h1 className="shrink-0 whitespace-nowrap bg-gray-50 px-5 py-2 rounded-2xl">
          FullStack Developer
        </h1>
      </div>
      <FaArrowRight className="cursor-pointer text-xl" onClick={() => scroll("right")} />
    </div>
  );
}

export default Scroller;
