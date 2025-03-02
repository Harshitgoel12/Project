import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { Textarea } from "../ui/textarea"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpdateProfile() {
    // const [userData,setUserData]=useState({})
    // useEffect(()=>{
    //    const data= localStorage.getItem("userdetail");
    //    const result=JSON.parse(data);
    //    setUserData(result);
    //    console.log(result);
    // },[])
    // const [userInput,setInput]=useState({
    //    username:userData.username,
    //    Indastary:userData.Indastary||"NA",
    //    Experience:userData.Exerience||"NA",
    //    About:userData.About||"NA",
    //    skills:userData.skills||"NA",
    //    email:userData.email||"NA",
    //    Number:userData.Number||"NA",
    //    file:userData.file||"NA",
    //   })

    const [userData, setUserData] = useState({}); // Initialize with empty object
  
  useEffect(() => {
    const data = localStorage.getItem("userdetail");
    if (data) {
      const result = JSON.parse(data);
      setUserData(result);
    }
  }, []);

  // Update userInput when userData changes
  const [userInput, setInput] = useState({});
const navigate=useNavigate();
  useEffect(() => {
    setInput({
      username: userData.username || "NA",
      Industary: userData.Industary || "NA",
      Experience: userData.Experience || "NA",
      About: userData.About || "NA",
      skills: userData.skills || "NA",
      email: userData.email || "NA",
      Number: userData.Number || "NA",
      file: userData.file || "NA",
    });
  }, [userData]);
      async function handlesubmit(e){
        e.preventDefault();
       
        const formData=new FormData();
        formData.append("username",userInput.username);
        formData.append("Industary",userInput.Industary);
        formData.append("Experience",userInput.Experience);
        formData.append("About",userInput.About);
        formData.append("skills",userInput.skills);
        formData.append("email",userInput.email);
        formData.append("Number",userInput.Number)
        if(userInput.file){
        formData.append("file",userInput.file);
        }
            try {
                const res= await axios.put("http://localhost:3000/api/updateProfile",formData,
                {
                  headers: {'Content-Type': "multipart/form-data" },
                  withCredentials: true,
              })
              console.log(res.data);
              if(res.data.success){
                localStorage.setItem("userdetail",JSON.stringify(res.data.user));
                console.log(localStorage.getItem("userdetail"));
               navigate("/profile");
              }
            } catch (error) {
                console.log("something went wrong while updating the userData",error)
            }
      }
      const handlechange = (e) => {
        const { name, value, type, files } = e.target;
        if (type !== 'file') {
          setInput({ ...userInput, [name]: value });
        } else {
          setInput({ ...userInput, file: files?.[0] });
        }
      };
  return (
    <div className=' flex items-center flex-col  md:mx-0'>
         <form className='w-screen   ms-10 me-10  border mt-12 pb-12 flex items-center flex-col' onSubmit={handlesubmit}>
          <h1 className='text-2xl font-bold mt-3'>Update Details</h1>
          <Field label="Full Name" required className='mt-8 w-3/4 '>
          <Input placeholder="Harshit Goel" name="username" className='ps-2 border' onChange={handlechange}  value={userInput.username}/>
        </Field>
        <Field label="Industary" required className='mt-8 w-3/4 '>
          <Input placeholder="eg web developer" name="Industary" className='ps-2 border' onChange={handlechange}  value={userInput.Industary}/>
        </Field>
        <Field label="Experience" required className='mt-8 w-3/4 '>
          <Input placeholder="tell about anything you do " name="Experience" className='ps-2 border' onChange={handlechange}  value={userInput.Experience}/>
        </Field>
         <Field label="About" required className="mt-6 w-3/4">
                  <Textarea
                    placeholder="Provide a brief job description, responsibilities, and expectations..."
                    onChange={handlechange}
                    value={userInput.About}
                    name="About"
                    className="h-32"
                  />
                </Field>
                <Field label="Skills" required  className='mt-8 w-3/4 '>
          <Input placeholder="Skills" name="skills" className='ps-2 border' onChange={handlechange} value={userInput.skills}/>
        </Field>
        <Field label="Email" required  className='mt-8 w-3/4 '>
          <Input placeholder="xyz@gmail.com" name="email" className='ps-2 border' onChange={handlechange} value={userInput.email}/>
        </Field>
        <Field label="Phone Number" required  className='mt-8 w-3/4 '>
          <Input placeholder="8080808080" name="Number" className='ps-2 border' onChange={handlechange} value={userInput.Number}/>
        </Field>
       
        <div className='mt-8 flex md:justify-between w-4/4 gap-5 justify-center flex-wrap'>
    
    
    
            <Input type="file" name='file' placeholder='upload file' onChange={handlechange} />
            </div>
            <Button type="submit" className='w-3/4 bg-black text-white mt-8 '>Update Profile</Button>
          </form> 
        </div>
  )
}

export default UpdateProfile
