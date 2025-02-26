import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {RouterProvider,createBrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import HeroSection from './HeroSection.jsx'

import Signup from './Signup.jsx'
import Jobs from './Jobs.jsx'
import Login from './Login.jsx'
import Browser from './Browser.jsx'

import { Provider } from "./components/ui/provider";



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
