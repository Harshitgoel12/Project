import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Myjobs from '../RecruiterComponent/Myjobs';

function AllJobs() {
  const [Alljobs,setAlljobs]=useState([]);
  async function getAlljobs(){
     try {
      const result= await axios.get("http://localhost:3000/api/Alljobs", {withCredentials: true})
      setAlljobs(result.data.data);
     } catch (error) {
      console.log("something went wrong while fetching all jobs "+error)
     }
  }
  useEffect(()=>{
   getAlljobs();
  },[])
  return (
    <div>
     <Myjobs data={Alljobs}/>
    </div>
  )
}

export default AllJobs
