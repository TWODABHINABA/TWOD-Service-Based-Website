import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import AdminDashboard from './pages/Admin/DashBoard'
import CareerPage from './pages/Career'
import { StarsBackground } from './components/animate-ui/backgrounds/stars';
const App = () => {
  return (
    <div>
      <StarsBackground>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/career' element={<CareerPage/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        {/* <Route path="/feedback" element={<Feedback />} /> */}

      </Routes>
      <Footer/>
      </StarsBackground>
    </div>
  )
}

export default App