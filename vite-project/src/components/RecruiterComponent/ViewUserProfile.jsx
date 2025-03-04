import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewUserProfile() {
    const params=useParams();
const [userData,setUserData]=useState(null);
  async function  Findoutdetail(){
     try {
         const data= await axios.get("http://localhost:3000/api/ViewUserProfile/"+params.id,{
           headers :{"Content-Type":"application/json"},
           withCredentials:true
          })
          console.log(data.data.data.data);
          setUserData(data.data.data.data);
     } catch (error) {
        console.log("something went wrong while fetching data",error)
     }

  }
    useEffect(()=>{
        Findoutdetail();
    },[])
    console.log(params.id)
    return (
        <div className='w-full relative bg-gray-100 min-h-screen mt-2'>
            {/* Cover Image */}
            <img
                src='https://miro.medium.com/v2/resize:fit:1400/0*IMK4r0ciK6Sa7k_k'
                className='w-full h-60 object-cover'
                alt='Cover'
            />

            {/* Profile Picture */}
            <div className='absolute top-40 left-8'>
                <img
                    src="https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk="
                    className='h-32 w-32 rounded-full border-4 border-white shadow-lg'
                    alt='Profile'
                />
            </div>

            {/* User Info + Edit Button */}
            <div className='mt-20 ml-8 h-24 flex items-center justify-between pr-10'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>{userData?.username||"NA"}</h1>
                    <h2 className='text-xl font-semibold text-gray-600 '>{userData?.Industary||"NA"}</h2>
                    <p className='text-gray-500 mt-2'>
                    {"NA"}
                    </p>
                </div>
              
            </div>

            <hr className='my-6' />

            {/* About Section */}
            <div className='mb-16 px-8'>
                <h1 className='text-4xl font-semibold mb-4'>About</h1>
                <p className='text-justify text-gray-700 leading-relaxed'>
                {userData?.About||"NA"}
                </p>
            </div>

            {/* Skills Section */}
            <div className='px-8 py-4'>
                <h1 className='text-4xl font-semibold mb-4'>Skills</h1>
                <div className='flex flex-wrap gap-4'>
                    {userData?.skills?.map((skill) => (
                        <span key={skill} className='bg-blue-600 text-white font-semibold shadow-md shadow-blue-900 rounded-lg px-4 py-2'>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Resume Section */}
            <div className='px-8 py-4 mt-10 w-full'>
                <h1 className='text-4xl font-semibold mb-4 '>Resume</h1>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href={userData?.Resume}
                      target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        View Resume
                    </a>
                </div>
            </div>

            {/* Contact Section */}
            <div className='px-8 py-4 mt-6'>
                <h1 className='text-4xl font-semibold mb-4'>Contact</h1>
                <p className='text-gray-700'><strong>Email:</strong>{userData?.email}</p>
                <p className='text-gray-700'><strong>LinkedIn:</strong> {userData?.LinkedIn}</p>
                <p className='text-gray-700'><strong>GitHub:</strong> {userData?.Github}</p>
            </div>




        </div>
    );
}

export default ViewUserProfile
