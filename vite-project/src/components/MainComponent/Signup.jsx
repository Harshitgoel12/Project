// import React from 'react'
// import { Input } from "@chakra-ui/react"
// import { Field } from "@/components/ui/field"
// import { Button } from "@chakra-ui/react"
// import { useState } from "react"
// import { SpinnerCircular, SpinnerCircularFixed } from 'spinners-react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// function Signup() {
//   const[isloading,setIsloading]=useState(false);
//   const [userInput,setInput]=useState({
//    username:'',
//    email:'',
//    Number:'',
//    password:'',
//    role:'student',
//    file:''
//   })
//   const navigate=useNavigate();
//   const handlechange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type !== 'file') {
//       setInput({ ...userInput, [name]: value });
//     } else {
//       setInput({ ...userInput, file: files?.[0] });
//     }
//   };
//   async function handlesubmit(e){
//     e.preventDefault();
//     setIsloading(true);
//     const formData =new FormData();
//     formData.append("username",userInput.username);
//     formData.append("email",userInput.email);
//     formData.append("Number",userInput.Number);
//     formData.append("password",userInput.password);
//     formData.append("role",userInput.role);
//     formData.append("file",userInput.file);
//     try{
//       const res= await axios.post("http://localhost:3000/api/register",formData,
//       {
//         headers: {'Content-Type': "multipart/form-data" },
//         withCredentials: true,
//     })
//     if (res.data.success) {
//       navigate("/login");

//   }
//      }
//     catch(err){
//       console.log(err);

//     }
//     setIsloading(false);
//   }
//   return (
//     <div className='w-full flex items-center flex-col  md:mx-0'>
//      <form className='w-full  md:w-2/5 ms-10 me-10  border mt-12 pb-12 flex items-center flex-col' onSubmit={handlesubmit}>
//       <h1 className='text-2xl font-bold mt-3'>Sign up</h1>
//       <Field label="Full Name" required className='mt-8 w-3/4 '>
//       <Input placeholder="Harshit Goel" name="username" className='ps-2 border' onChange={handlechange}  value={userInput.username}/>
//     </Field>
    
//     <Field label="Email" required  className='mt-8 w-3/4 '>
//       <Input placeholder="xyz@gmail.com" name="email" className='ps-2 border' onChange={handlechange} value={userInput.email}/>
//     </Field>
//     <Field label="Phone Number" required  className='mt-8 w-3/4 '>
//       <Input placeholder="8080808080" name="Number" className='ps-2 border' onChange={handlechange} value={userInput.Number}/>
//     </Field>
//     <Field label="Password" required  className='mt-8 w-3/4 '>
//       <Input placeholder="password" name="password" className='ps-2 border' onChange={handlechange} value={userInput.password}/>
//     </Field>
//     <div className='mt-8 flex md:justify-between  gap-5 justify-center flex-wrap'>


// <div onChange={handlechange} className='flex gap-8 '>
//   <div className='align-baseline'>
//         <input type="radio" value="student" name="role" className='w-5 h-5 ' /> <span className='text-xl font-semibold mb-4'>Student</span> 
//         </div>
//         <div className='align-baseline'>
//         <input type="radio" value="recruiter" name="role" className='w-5 h-5'/> <span className='text-xl font-semibold mb-4'>Recruiter</span>
//         </div>
//       </div>
       
//         </div>
//          <div className='flex justify-center  mt-10'>
//         <Input type="file" name='file' placeholder='upload file' onChange={handlechange} />
//         </div>
//        {isloading?<Button
//   type="submit"
//   className="w-3/4 bg-black text-white mt-8 rounded-lg flex items-center justify-center gap-2 py-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//   disabled
// >
//   <span>Processing...</span>
//   <SpinnerCircularFixed
//     size={24}
//     thickness={160}
//     speed={120}
//     color="rgba(255, 255, 255, 0.9)"
//     secondaryColor="rgba(255, 255, 255, 0.3)"
//   />
// </Button> :<Button type="submit" className='w-3/4 bg-black text-white mt-8 rounded-lg' >Signup</Button>
// }

//       </form> 
//     </div>
//   )
// }

// export default Signup









import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
  Paper,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    Number: "",
    password: "",
    role: "student",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setUserInput({ ...userInput, file: files[0] });
    } else {
      setUserInput({ ...userInput, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(userInput).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      const res = await axios.post("http://localhost:3000/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fafb",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 450 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="username"
              value={userInput.username}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={userInput.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Phone Number"
              name="Number"
              type="tel"
              value={userInput.Number}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={userInput.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl>
              <FormLabel>Role</FormLabel>
              <RadioGroup
                row
                value={userInput.role}
                onChange={(e) =>
                  setUserInput({ ...userInput, role: e.target.value })
                }
              >
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
              </RadioGroup>
            </FormControl>

            <Button variant="outlined" component="label">
              Upload File
              <input
                type="file"
                name="file"
                hidden
                onChange={handleChange}
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;
