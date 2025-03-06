import { SpinnerCircular, SpinnerCircularFixed } from 'spinners-react';
import { Button, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function PostJob() {
  const navigate=useNavigate();
  const[isloading,setIsloading]=useState(false);
  const [data, setData] = useState({
    ComponyName:"",
    Title: "",
    Description: "",
    Requirements:"",
    skills: "",
    Salary: "",
    Location: "",
    Position: "", 
    JobType: "",
    logo: null,
  });

  function changeHandler(e) {
    const { name, value, files } = e.target;

    if (name !== "logo") {
      setData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: files[0] })); // No `?` needed
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData();
    formData.append("ComponyName",data.ComponyName)
    formData.append("Title", data.Title);
    formData.append("Description", data.Description);
    formData.append("Requirements",data.Requirements)
    formData.append("skills", data.skills);
    formData.append("Salary", data.Salary);
    formData.append("Position", data.Position); // Changed from "Positions"
    formData.append("Location", data.Location);
    formData.append("JobType", data.JobType);
    formData.append("logo", data.logo);

    try {
      const result = await axios.post("http://localhost:3000/api/postjob", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(result);
      if(result.data.success){
        navigate('/');
      }
    } catch (error) {
      console.log("Something went wrong while posting a job", error);
    }
    setIsloading(false);
  }

  return (
    <div className="w-full items-center flex flex-col">
      <form
        onSubmit={submitHandler}
        className="w-full h-full md:w-3/4 flex flex-col items-center bg-white mt-10 rounded-lg drop-shadow-lg pb-10"
      >
        <h1 className="text-3xl font-bold text-gray-600 mt-6">Post Job</h1>
        <Field label="Compony Name" required className="mt-8 w-3/4">
          <Input
            placeholder="Enter Name of the Compony"
            onChange={changeHandler}
            name="ComponyName"
            value={data.ComponyName}
            className="ps-2 border"
          />
          </Field>
        <Field label="Title" required className="mt-8 w-3/4">
          <Input
            placeholder="Enter job title (e.g., Software Engineer)"
            onChange={changeHandler}
            name="Title"
            value={data.Title}
            className="ps-2 border"
          />
        </Field>

        <Field label="Description" required className="mt-6 w-3/4">
          <Textarea
            placeholder="Provide a brief job description, responsibilities, and expectations..."
            onChange={changeHandler}
            value={data.Description}
            name="Description"
            className="h-32"
          />
        </Field>
        <Field label="Requirements" required className="mt-6 w-3/4">
          <Textarea
            placeholder="Provide a brief job description, responsibilities, and expectations..."
            onChange={changeHandler}
            value={data.Requirements}
            name="Requirements"
            className="h-32"
          />
        </Field>

        <Field label="skills" required className="mt-6 w-3/4">
          <Input
            placeholder="List key skills and qualifications (e.g., React, Node.js)"
            onChange={changeHandler}
            value={data.skills}
            name="skills"
            className="ps-2 border"
          />
        </Field>

        <Field label="Salary" required className="mt-6 w-3/4">
          <Input
            placeholder="Enter salary (e.g., $50,000/year)"
            onChange={changeHandler}
            value={data.Salary}
            name="Salary"
            className="ps-2 border"
          />
        </Field>

        <Field label="Position" required className="mt-6 w-3/4">
          <Input
            type="number"
            placeholder="Vacant seat"
            onChange={changeHandler}
            value={data.Position}
            name="Position"
            className="ps-2 border"
          />
        </Field>

        <Field label="Location" required className="mt-6 w-3/4">
          <Input
            placeholder="Enter city or remote"
            name="Location"
            onChange={changeHandler}
            value={data.Location}
            className="ps-2 border"
          />
        </Field>

        <Field label="Job Type" required className="mt-6 w-3/4">
          <Input
            placeholder="Select job type (e.g., Full-time, Part-time, Contract)"
            onChange={changeHandler}
            value={data.JobType}
            name="JobType"
            className="ps-2 border"
          />
        </Field>

        <Field label="Company Logo" required className="mt-6 w-3/4">
          <Input
            type="file"
            name="logo"
            className="ps-2 border"
            onChange={changeHandler}
            accept="image/*" // Added to allow only image files
          />
        </Field>
         {isloading?<Button
          type="submit"
          className="w-3/4 bg-black text-white mt-8 rounded-lg flex items-center justify-center gap-2 py-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          <span>Processing...</span>
          <SpinnerCircularFixed
            size={24}
            thickness={160}
            speed={120}
            color="rgba(255, 255, 255, 0.9)"
            secondaryColor="rgba(255, 255, 255, 0.3)"
          />
        </Button> :<Button type="submit" className='w-3/4 bg-black text-white mt-8 rounded-lg' > Post New Job</Button>
        }

        
      </form>
    </div>
  );
}

export default PostJob;

