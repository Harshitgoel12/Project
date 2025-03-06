import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {RouterProvider,createBrowserRouter} from "react-router-dom"
import './index.css'
import App from './components/MainComponent/App.jsx'
import HeroSection from './components/MainComponent/HeroSection.jsx'

import Signup from './components/MainComponent/Signup.jsx'
import Jobs from './components/UserComponent/Jobs.jsx'
import Login from './components/MainComponent/Login.jsx'
import ShortlistedCompony from './components/UserComponent/ShortlistedCompony.jsx'
import PostJob  from "./components/RecruiterComponent/PostJob.jsx"
import { Provider } from "./components/ui/provider";
import MyPostedJob from './components/RecruiterComponent/MyPostedJob'
import DetailsofJob from './components/RecruiterComponent/DetailsofJob'
import ViewProfile from './components/UserComponent/ViewProfile'
import UpdateProfile from './components/UserComponent/UpdateProfile'
import MyAppliedJobs from './components/UserComponent/MyAppliedJobs'
import AppliedStudent from './components/RecruiterComponent/AppliedStudent'
import ViewUserProfile from './components/RecruiterComponent/ViewUserProfile'
import ViewAppliedApplicant from './components/RecruiterComponent/ViewAppliedApplicant'
import ShortlistedCandidates from './components/RecruiterComponent/ShortlistedCandidates'
import ShowSelectedCandidates from './components/RecruiterComponent/ShowSelectedCandidates'



const AppRouter= createBrowserRouter([
  {
     path:'/',
     element:<App/>,
     children:[
      {
         path :'',
         element : <HeroSection/>
      },
      {
        path: 'jobs',
        element :<Jobs/>
      },
      {
        path:"ShortlistedCompony",
        element :<ShortlistedCompony/>
      },
      {
        path:'login',
        element :<Login/>
      },
      {
        path:'signup',
        element:<Signup/>
      },
      {
        path:'postjob',
        element :<PostJob/>
      },
      {
        path:'my-job',
        element :<MyPostedJob/>
      },
      {
        path:"details/:id",
        element:<DetailsofJob/>
      },
      {
        path:"profile",
        element:<ViewProfile/>
      },{
        path:"updateProfile",
        element:<UpdateProfile/>
      },
      {
        path:"MyAppliedJobs",
        element: <MyAppliedJobs/>
      },
      {
        path:"AppliedStudent",
        element:<AppliedStudent/>
      },
      {
        path:"ViewUserProfile/:id",
        element:<ViewUserProfile/>
      },
      {
        path:"ViewAppliedApplicants/:id",
        element:<ViewAppliedApplicant/>
      },
      {
        path:"Shortlisted",
        element:<ShortlistedCandidates/>
      },
      {
        path:"ShowShortlistedCandidates/:id",
        element:<ShowSelectedCandidates/>
      }
     ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
  <RouterProvider router={AppRouter} />
  </Provider>
</StrictMode>
)
