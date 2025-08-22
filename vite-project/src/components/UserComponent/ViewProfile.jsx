import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProfileHeader() {
  const [userData, setUserData] = useState({});
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userdetail");
    if (data) {
      const parsed = JSON.parse(data);
      // Ensure skills is always an array
      if (parsed.skills && typeof parsed.skills === "string") {
        parsed.skills = parsed.skills.split(",").map((s) => s.trim());
      }
      setUserData(parsed);
    }

    const resume = localStorage.getItem("resume");
    if (resume) setResumeLink(JSON.parse(resume));
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Resume", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/uploadresume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (response.data.success) {
        localStorage.setItem("resume", JSON.stringify(response.data.data));
        setResumeLink(response.data.data);
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  return (
    <div className="w-full relative bg-gray-100 min-h-screen mt-2">
      {/* Cover Image */}
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/0*IMK4r0ciK6Sa7k_k"
        className="w-full h-60 object-cover"
        alt="Cover"
      />

      {/* Profile Picture */}
      <div className="absolute top-40 left-8">
        <img
          src={userData.file || "https://via.placeholder.com/150"}
          className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
          alt="Profile"
        />
      </div>

      {/* User Info + Edit Button */}
      <div className="mt-20 ml-8 h-24 flex items-center justify-between pr-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{userData.username}</h1>
          <h2 className="text-xl font-semibold text-gray-600">{userData.Industary || "NA"}</h2>
          <p className="text-gray-500 mt-2">{userData.Experience || "NA"}</p>
        </div>

        <Link to="/updateProfile">
          <button className="bg-blue-600 text-white font-semibold -mt-32 px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </Link>
      </div>

      <hr className="my-6" />

      {/* About Section */}
      <div className="mb-16 px-8">
        <h1 className="text-4xl font-semibold mb-4">About</h1>
        <p className="text-justify text-gray-700 leading-relaxed">{userData.About || "NA"}</p>
      </div>

      {/* Skills Section */}
      <div className="px-8 py-4">
        <h1 className="text-4xl font-semibold mb-4">Skills</h1>
        <div className="flex flex-wrap gap-4">
          {userData.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-blue-600 text-white font-semibold shadow-md shadow-blue-900 rounded-lg px-4 py-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Section */}
      <div className="px-8 py-4 mt-10 w-full">
        <h1 className="text-4xl font-semibold mb-4">Resume</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              View Resume
            </a>
          )}

          {/* Upload Resume Button */}
          {userData.role === "student" && (
            <label className="cursor-pointer bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
              Upload Resume
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} />
            </label>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-8 py-4 mt-6">
        <h1 className="text-4xl font-semibold mb-4">Contact</h1>
        <p className="text-gray-700">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-gray-700">
          <strong>LinkedIn:</strong> {userData.LinkedIn || "NA"}
        </p>
        <p className="text-gray-700">
          <strong>GitHub:</strong> {userData.Github || "NA"}
        </p>
      </div>
    </div>
  );
}
