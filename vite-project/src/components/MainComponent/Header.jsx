import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import ShowManu from "./ShowManu";
import context from "../createcontext";
import RecruiterPage from "../RecruiterComponent/RecruiterPage";
import NormalHeader from "../UserComponent/NormalHeader";
import Profile from "../Profile";
import ShowProfile from "../ShowProfile";

function Header() {
  const { islogin, setIslogin } = useContext(context);
  const [user, setUser] = useState(null);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userdetail");
    if (islogin && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [islogin]);

  return (
    <header className="relative bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-3xl font-bold">
            Job <span className="text-red-500">Portal</span>
          </h2>
        </Link>

        {!islogin ? (
          // Non-logged-in links
          <div className="flex items-center gap-4">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/MyAppliedJobs" className="font-semibold hover:text-gray-700">Home</Link>
              <Link to="/jobs" className="font-semibold hover:text-gray-700">Jobs</Link>
              <Link to="/browser" className="font-semibold hover:text-gray-700">Browser</Link>
              <Link to="/login">
                <button className="px-5 py-2 bg-purple-50 rounded-lg border font-semibold hover:bg-purple-100">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-purple-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-purple-800">Signup</button>
              </Link>
            </div>

            {/* Mobile hamburger menu */}
            <GiHamburgerMenu
              className="text-2xl block md:hidden cursor-pointer"
              onClick={() => setShowBurgerMenu(!showBurgerMenu)}
            />
          </div>
        ) : (
          // Logged-in user
          <div className="flex items-center gap-4">
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-6">
              {user?.role === "recruiter" ? <RecruiterPage /> : <NormalHeader />}

              {/* Profile image */}
              <div
                className="cursor-pointer"
                onClick={() => setShowProfileCard(!showProfileCard)}
              >
                <img
                  src={user?.file || "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border object-cover"
                />
              </div>
            </div>

            {/* Mobile hamburger */}
            <GiHamburgerMenu
              className="text-2xl block lg:hidden cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
          </div>
        )}
      </div>

      {/* Profile Card for Desktop */}
      {islogin && showProfileCard && (
        <Profile
          user={user}
          setImage={setShowProfileCard}
          image={showProfileCard}
        />
      )}

      {/* Dropdown menu for mobile */}
      {islogin && showProfileDropdown && (
        <ShowProfile
          user={user}
          data={
            user?.role === "recruiter"
              ? ["Home", "Posted Jobs", "Post Job", "Applicants", "Shortlisted Candidates"]
              : ["Home", "Applied Job", "Search Job", "Shortlisted Companies"]
          }
          setHandleProfile={setShowProfileDropdown}
          handleprofile={showProfileDropdown}
        />
      )}

      {/* Hamburger menu for non-logged-in mobile users */}
      {showBurgerMenu && <ShowManu />}
    </header>
  );
}

export default Header;
