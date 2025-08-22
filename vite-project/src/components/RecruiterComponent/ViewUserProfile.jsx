import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function ViewUserProfile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUserDetails() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/ViewUserProfile/${params.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUserData(data?.data?.data || null);
    } catch (err) {
      console.log("Error fetching user profile:", err);
      setError("Failed to load user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!userData) {
    return (
      <p className="text-center text-gray-600 mt-10">
        User profile not available.
      </p>
    );
  }

  return (
    <div className="w-full relative bg-gray-100 min-h-screen">
      {/* Cover Image */}
      <img
        src={userData?.coverImage || "https://via.placeholder.com/1400x300"}
        className="w-full h-60 object-cover"
        alt="Cover"
      />

      {/* Profile Picture */}
      <div className="absolute top-40 left-8">
        <img
          src={userData?.profileImage || "https://via.placeholder.com/150"}
          className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
          alt="Profile"
        />
      </div>

      {/* User Info */}
      <div className="mt-20 ml-8 h-24 flex flex-col sm:flex-row items-center justify-between pr-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {userData?.username || "NA"}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            {userData?.Industary || "NA"}
          </h2>
          <p className="text-gray-500 mt-2">{userData?.headline || "NA"}</p>
        </div>
      </div>

      <hr className="my-6" />

      {/* About Section */}
      <div className="mb-16 px-8">
        <h1 className="text-4xl font-semibold mb-4">About</h1>
        <p className="text-justify text-gray-700 leading-relaxed">
          {userData?.About || "No description provided."}
        </p>
      </div>

      {/* Skills Section */}
      <div className="px-8 py-4">
        <h1 className="text-4xl font-semibold mb-4">Skills</h1>
        <div className="flex flex-wrap gap-4">
          {userData?.skills?.length > 0 ? (
            userData.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-600 text-white font-semibold shadow-md rounded-lg px-4 py-2"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="px-8 py-4 mt-10 w-full">
        <h1 className="text-4xl font-semibold mb-4">Resume</h1>
        {userData?.Resume ? (
          <a
            href={userData.Resume}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500">Resume not uploaded.</p>
        )}
      </div>

      {/* Contact Section */}
      <div className="px-8 py-4 mt-6">
        <h1 className="text-4xl font-semibold mb-4">Contact</h1>
        <p className="text-gray-700">
          <strong>Email:</strong> {userData?.email || "NA"}
        </p>
        <p className="text-gray-700">
          <strong>LinkedIn:</strong>{" "}
          {userData?.LinkedIn ? (
            <a
              href={userData.LinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {userData.LinkedIn}
            </a>
          ) : (
            "NA"
          )}
        </p>
        <p className="text-gray-700">
          <strong>GitHub:</strong>{" "}
          {userData?.Github ? (
            <a
              href={userData.Github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {userData.Github}
            </a>
          ) : (
            "NA"
          )}
        </p>
      </div>
    </div>
  );
}

export default ViewUserProfile;
