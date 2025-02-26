import { Button, HStack, Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { useContext, useState } from "react"

import React from 'react'
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom"
import context from "./createcontext"

function Login() {
  const {islogin,setIslogin}=useContext(context);
  const navigate=useNavigate();
  const [input,setInput]=useState({
      email:'',
      password:'',
      role:''
  })
  function changeHandler(e){
   setInput({ ...input, [e.target.name]: e.target.value });
  }
async function submitHandler(e){
  e.preventDefault();
    try {
      const data= await axios.post("http://localhost:3000/api/login",input,
        {
        headers:{"Content-Type":"application/json"},
        withCredentials: true,
        }
      )
      console.log(data.data)
 if(data.data.success){
      localStorage.setItem("userdetail",JSON.stringify(data.data.user));
      localStorage.setItem("islogin",true);
      setIslogin(true);
      navigate('/');
    }
    } catch (error) {
      console.log("something went wrong in login form", error)
    } 

}
  return (
    <div className="flex items-center justify-center h-screen">
   <form  className="flex md:w-1/2 w-full pb-8  border flex-col items-center" onSubmit={submitHandler}>
    <h1 className="mt-6 font-bold text-2xl ">Login</h1>
    <Field label="Email" required className="mt-8 w-3/4">
        <Input placeholder="xyz@gmail.com" value={input.email} onChange={changeHandler} name="email" variant="outline"  className="border ps-3"/>
      </Field>
      <Field label="Password" required className="mt-8 w-3/4">
        <Input  placeholder="1234"  value={input.password} name="password" onChange={changeHandler} variant="outline"  className="border ps-3"/>
      </Field>
      <RadioGroup defaultValue="1" className="mt-8 w-3/4">
      <HStack gap="6">
        <Radio value="student" onChange={changeHandler} checked={input.role==="student"}>Student</Radio>
        <Radio value="recruiter" onChange={changeHandler} checked ={input.role==="recruiter"}>Recruiter</Radio>
      </HStack>
    </RadioGroup>
     <Button type="submit" className='w-2/3 bg-black text-white mt-8 '>Button</Button>
   </form>

    </div>
  )
}

export default Login;




  