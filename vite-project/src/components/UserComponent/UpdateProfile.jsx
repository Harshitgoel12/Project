import React, { useEffect, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { Textarea } from "../ui/textarea";
import { Field } from "@/components/ui/field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [userInput, setUserInput] = useState({
    username: "",
    Industary: "",
    Experience: "",
    About: "",
    skills: "",
    email: "",
    Number: "",
    file: null,
  });

  const navigate = useNavigate();

  // Load user details from localStorage
  useEffect(() => {
    const data = localStorage.getItem("userdetail");
    if (data) {
      const parsed = JSON.parse(data);
      setUserInput({
        username: parsed.username || "",
        Industary: parsed.Industary || "",
        Experience: parsed.Experience || "",
        About: parsed.About || "",
        skills: Array.isArray(parsed.skills)
          ? parsed.skills.join(", ")
          : parsed.skills || "",
        email: parsed.email || "",
        Number: parsed.Number || "",
        file: null, // file will be updated only if user uploads a new one
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setUserInput((prev) => ({ ...prev, file: files[0] }));
    } else {
      setUserInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userInput) {
      if (key === "file" && !userInput.file) continue;
      formData.append(key, userInput[key]);
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/api/updateProfile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("userdetail", JSON.stringify(res.data.user));
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex items-center flex-col md:mx-0">
      <form
        className="w-screen ms-10 me-10 border mt-12 pb-12 flex items-center flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mt-3">Update Details</h1>

        <Field label="Full Name" required className="mt-8 w-3/4">
          <Input
            placeholder="Full Name"
            name="username"
            onChange={handleChange}
            value={userInput.username}
          />
        </Field>

        <Field label="Industry" required className="mt-8 w-3/4">
          <Input
            placeholder="eg Web Developer"
            name="Industary"
            onChange={handleChange}
            value={userInput.Industary}
          />
        </Field>

        <Field label="Experience" required className="mt-8 w-3/4">
          <Input
            placeholder="Tell about your experience"
            name="Experience"
            onChange={handleChange}
            value={userInput.Experience}
          />
        </Field>

        <Field label="About" required className="mt-6 w-3/4">
          <Textarea
            placeholder="Provide a brief description..."
            name="About"
            onChange={handleChange}
            value={userInput.About}
            className="h-32"
          />
        </Field>

        <Field label="Skills" required className="mt-8 w-3/4">
          <Input
            placeholder="Comma separated skills"
            name="skills"
            onChange={handleChange}
            value={userInput.skills}
          />
        </Field>

        <Field label="Email" required className="mt-8 w-3/4">
          <Input
            placeholder="example@gmail.com"
            name="email"
            onChange={handleChange}
            value={userInput.email}
          />
        </Field>

        <Field label="Phone Number" required className="mt-8 w-3/4">
          <Input
            placeholder="8080808080"
            name="Number"
            onChange={handleChange}
            value={userInput.Number}
          />
        </Field>

        <div className="mt-8 flex md:justify-between w-4/4 gap-5 justify-center flex-wrap">
          <Input type="file" name="file" onChange={handleChange} />
        </div>

        <Button type="submit" className="w-3/4 bg-black text-white mt-8">
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
