import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import context from "../createcontext.js";

function Login() {
  const { setIslogin } = useContext(context);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student", // default role
  });

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsloading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(data);

      if (data.success) {
        localStorage.setItem("userdetail", JSON.stringify(data.user));
        localStorage.setItem("islogin", true);
        setIslogin(true);
        navigate("/");
      }
    } catch (error) {
      console.log("something went wrong in login form", error);
    }
    setIsloading(false);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: { xs: "90%", sm: "400px" },
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={input.email}
          onChange={changeHandler}
          required
          fullWidth
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={input.password}
          onChange={changeHandler}
          required
          fullWidth
        />

        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            row
            value={input.role}
            onChange={(e) => setInput({ ...input, role: e.target.value })}
          >
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
         variant="contained"
          sx={{ mt: 2,  "&:hover": { bgcolor: "gray.800" } }}
          disabled={isloading}
        >
          {isloading ? (
            <>
              <CircularProgress size={22} sx={{ color: "white", mr: 1 }} />
              Processing...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
