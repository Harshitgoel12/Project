import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {RouterProvider,createBrowserRouter} from "react-router-dom"
import './index.css'
import App from './components/MainComponent/App.jsx'
import HeroSection from './components/MainComponent/HeroSection.jsx'

import Signup from './components/MainComponent/Signup.jsx'
import Jobs from './components/MainComponent/Jobs.jsx'
import Login from './components/MainComponent/Login.jsx'
import Browser from './components/MainComponent/Browser.jsx'
import PostJob  from "./components/RecruiterComponent/PostJob.jsx"
import { Provider } from "./components/ui/provider";
import MyPostedJob from './components/RecruiterComponent/MyPostedJob'
import DetailsofJob from './components/RecruiterComponent/DetailsofJob'



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
        path:"browser",
        element :<Browser/>
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
