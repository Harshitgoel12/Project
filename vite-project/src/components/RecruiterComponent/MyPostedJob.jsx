import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Myjobs from './Myjobs';

function MyPostedJob() {
    const [data,setData]=useState([])
    async function fun(){
      const result= await axios.get("http://localhost:3000/api/myjobs", {withCredentials: true});
      console.log(result);
      setData(result.data);
    }
    
    useEffect(()=>{
      fun();
    },[])
  return (
    <div>
     {data.length==0? (<div>
        <h1>Their is no job Available</h1>
     </div>):(<Myjobs data={data.data}/>)}
    </div>
  )
}

export default MyPostedJob
