// export default function ProfileHeader() {
//     return (
//         <div className='w-full relative '>
//             <img
//                 src='https://miro.medium.com/v2/resize:fit:1400/0*IMK4r0ciK6Sa7k_k'
//                 className='w-full h-60 object-cover'
//                 alt='Cover'
//             />
//             <div className='absolute top-40 left-8'>
//                 <img
//                     src='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
//                     className='h-32 w-32 rounded-full border-4 border-white shadow-lg'
//                     alt='Profile'
//                 />
//             </div>
//             <div className='mt-12 ml-8 h-24'>
//                 <h1 className='text-3xl font-bold text-gray-800 mt-2'>Harshit Goel</h1>
//                 <h1 className="text-xl font-semibold ml-2">Web Developer</h1>
//             </div>

//             <hr />
//             <div className="mb-16">
//                 <h1 className="text-4xl font-semibold ms-16 mt-3">About</h1>
//                 <p className="  text-justify mx-10 flex  mt-3 justify-center"> As a Software Engineer at Google, I specialize in building scalable and high-performance applications. 
//         My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. 
//         With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate 
//         about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful 
//         software that enhances productivity and meets user needs effectively.</p>
//             </div>
//             <div className="px-6 py-4">
//   {/* Title */}
//   <h1 className="text-4xl font-semibold ml-4 mt-3">Skills</h1>
  
//   {/* Skill Badge */}
//   <div className="mt-4 ml-4 flex gap-8">
//     <span className="bg-blue-600 text-white font-semibold shadow-md shadow-blue-900 rounded-lg px-4 py-2 inline-block">
//       HTML
//     </span>
    
//   </div>
// </div>


//         </div>
//     );
// }



export default function ProfileHeader() {
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
                    src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'
                    className='h-32 w-32 rounded-full border-4 border-white shadow-lg'
                    alt='Profile'
                />
            </div>

            {/* User Info + Edit Button */}
            <div className='mt-20 ml-8 h-24 flex items-center justify-between pr-10'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>Harshit Goel</h1>
                    <h2 className='text-xl font-semibold text-gray-600'>Web Developer</h2>
                    <p className='text-gray-500 mt-2'>
                        Building innovative web applications and solving complex problems with modern technologies.
                    </p>
                </div>

                {/* Edit Profile Button */}
                <button className="bg-blue-600 text-white font-semibold -mt-32 px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 "
                >
                    Edit Profile
                </button>
            </div>

            <hr className='my-6' />

            {/* About Section */}
            <div className='mb-16 px-8'>
                <h1 className='text-4xl font-semibold mb-4'>About</h1>
                <p className='text-justify text-gray-700 leading-relaxed'>
                    As a Software Engineer, I specialize in building scalable and high-performance applications. 
                    My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. 
                    With a strong foundation in React, Next.js, and Spring Boot, and a focus on MongoDB for database solutions, 
                    I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. 
                    My goal is to create impactful software that enhances productivity and meets user needs effectively.
                </p>
            </div>

            {/* Skills Section */}
            <div className='px-8 py-4'>
                <h1 className='text-4xl font-semibold mb-4'>Skills</h1>
                <div className='flex flex-wrap gap-4'>
                    {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'].map((skill) => (
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
                        href="/path-to-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        View Resume
                    </a>

                    {/* Upload Resume Button */}
                    <label className="cursor-pointer bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                        Upload Resume
                        <input type="file" className="hidden" />
                    </label>
                </div>
            </div>

            {/* Contact Section */}
            <div className='px-8 py-4 mt-6'>
                <h1 className='text-4xl font-semibold mb-4'>Contact</h1>
                <p className='text-gray-700'><strong>Email:</strong> harshitgoel@example.com</p>
                <p className='text-gray-700'><strong>LinkedIn:</strong> linkedin.com/in/harshitgoel</p>
                <p className='text-gray-700'><strong>GitHub:</strong> github.com/harshitgoel</p>
            </div>
        </div>
    );
}
