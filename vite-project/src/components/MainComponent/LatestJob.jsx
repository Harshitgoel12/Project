import React,{useState,useEffect} from 'react'
import Myjobs from '../RecruiterComponent/Myjobs';
import axios from 'axios';
function LatestJob() {
    const [LatestJob,setLatestJob]=useState([]);
    async function getLatestjobs(){
       try {
        const result= await axios.get("http://localhost:3000/api/LatestJob", {withCredentials: true})
        console.log(result.data.data);
        setLatestJob(result.data.data);
       } catch (error) {
        console.log("something went wrong while fetching all jobs "+error)
       }
    }
    useEffect(()=>{
     getLatestjobs();
    },[])
  return (
    <div>
    {LatestJob.length!=0?<Myjobs data={LatestJob}/>:<p className="mt-3 ms-28"> No Job Available</p>}
    </div>
  )
}

export default LatestJob
