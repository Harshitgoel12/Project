import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

function ShowMenu() {
  const [show, setShow] = useState(true);
  const ref = useRef();

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute top-0 right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl p-5 z-50 animate-fadeIn">
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShow(false)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <ImCross size={20} />
        </button>
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col items-center gap-4 mt-4">
        {["/", "/jobs", "/browser"].map((path, idx) => (
          <Link
            key={idx}
            to={path}
            className="font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
          </Link>
        ))}

        {/* Action Buttons */}
        <Link to="/login" className="w-full">
          <button className="w-full border-2 border-purple-600 text-purple-600 font-semibold py-2 rounded-xl hover:bg-purple-50 transition-all">
            Login
          </button>
        </Link>
        <Link to="/signup" className="w-full">
          <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition-all">
            Signup
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default ShowMenu;
