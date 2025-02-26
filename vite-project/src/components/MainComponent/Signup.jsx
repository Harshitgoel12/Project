import React from 'react'
import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@chakra-ui/react"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const [userInput,setInput]=useState({
   username:'',
   email:'',
   Number:'',
   password:'',
   role:'student',
   file:''
  })
  const navigate=useNavigate();
  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    if (type !== 'file') {
      setInput({ ...userInput, [name]: value });
    } else {
      setInput({ ...userInput, file: files?.[0] });
    }
  };
  async function handlesubmit(e){
    e.preventDefault()
    const formData =new FormData();
    formData.append("username",userInput.username);
    formData.append("email",userInput.email);
    formData.append("Number",userInput.Number);
    formData.append("password",userInput.password);
    formData.append("role",userInput.role);
    formData.append("file",userInput.file);
    try{
      const res= await axios.post("http://localhost:3000/api/register",formData,
      {
        headers: {'Content-Type': "multipart/form-data" },
        withCredentials: true,
    })
    if (res.data.success) {
      navigate("/login");

  }
     }
    catch(err){
      console.log(err);

    }
  }
  return (
    <div className='w-full flex items-center flex-col  md:mx-0'>
     <form className='w-full  md:w-2/5 ms-10 me-10  border mt-12 pb-12 flex items-center flex-col' onSubmit={handlesubmit}>
      <h1 className='text-2xl font-bold mt-3'>Sign up</h1>
      <Field label="Full Name" required className='mt-8 w-3/4 '>
      <Input placeholder="Harshit Goel" name="username" className='ps-2 border' onChange={handlechange}  value={userInput.username}/>
    </Field>
    <Field label="Email" required  className='mt-8 w-3/4 '>
      <Input placeholder="xyz@gmail.com" name="email" className='ps-2 border' onChange={handlechange} value={userInput.email}/>
    </Field>
    <Field label="Phone Number" required  className='mt-8 w-3/4 '>
      <Input placeholder="8080808080" name="Number" className='ps-2 border' onChange={handlechange} value={userInput.Number}/>
    </Field>
    <Field label="Password" required  className='mt-8 w-3/4 '>
      <Input placeholder="password" name="password" className='ps-2 border' onChange={handlechange} value={userInput.password}/>
    </Field>
    <div className='mt-8 flex md:justify-between w-4/4 gap-5 justify-center flex-wrap'>


<div onChange={handlechange}>
        <input type="radio" value="student" name="role"/> Student
        <input type="radio" value="recruiter" name="role"/> Recruiter
      </div>

        <Input type="file" name='file' placeholder='upload file' onChange={handlechange} />
        </div>
        <Button type="submit" className='w-3/4 bg-black text-white mt-8 '>Button</Button>
      </form> 
    </div>
  )
}

export default Signup
