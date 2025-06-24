import React from 'react'
import { useState,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import CareerPage from './pages/Career'
import { StarsBackground } from './components/animate-ui/backgrounds/stars'


// Admin pages
import Sidebar from './pages/Admin/Sidebar'
import AddJob from './pages/Admin/AddJob'
import AddTeamMember from './pages/Admin/AddTeamMember'
import JobApplications from './pages/Admin/JobApplications'
import TeamMemberList from './pages/Admin/TeamMemberList'

const App = () => {
const [user, setUser] = useState(null);
useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);
  
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
   <div className="relative">
      <StarsBackground className="z-0 fixed inset-0" />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<CareerPage />} />

          
          <Route path="/admin" element={<Sidebar />} />

         
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/add-team-member" element={<AddTeamMember />} />
          <Route path="/job-applications" element={<JobApplications />} />
          <Route path="/team-member-list" element={<TeamMemberList />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
