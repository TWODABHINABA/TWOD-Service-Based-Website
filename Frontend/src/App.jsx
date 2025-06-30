import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import CareerPage from './pages/Career';
import { StarsBackground } from './components/animate-ui/backgrounds/stars'; // ✅ Correct import
import api from './components/user-management/api';

// Admin pages
import Sidebar from './pages/Admin/Sidebar';
import AddJob from './pages/Admin/AddJob';
import AddTeamMember from './pages/Admin/AddTeamMember';
import JobApplications from './pages/Admin/JobApplications';
import TeamMemberList from './pages/Admin/TeamMemberList';
import ClientRequests from './pages/Admin/clientRequests';
import AddService from './pages/Admin/AddService';
import Register from './pages/Register';
import {Toaster} from "react-hot-toast"
import AutoLogout from './AutoLogout';

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

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
        setUser(res.data || null);
      } catch (err) {
        setUser(null);
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  // Only show stars on homepage
  const showStars = location.pathname === '/';

  return (
    <div className="relative">
      {showStars && (
        <StarsBackground className="z-0 fixed inset-0 pointer-events-none" />
      )}
      <Toaster position='top-right'/>
      <AutoLogout/>
      <div className="relative z-10">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<CareerPage user={user} />} />
          <Route path="/register/:id" element={<Register/>}   />
          <Route path="/admin" element={<Sidebar />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/add-team-member" element={<AddTeamMember />} />
          <Route path="/job-applications" element={<JobApplications />} />
          <Route path="/team-member-list" element={<TeamMemberList />} />
          <Route path="/client-requests" element={<ClientRequests />} />
          <Route path="/add-service" element={<AddService />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
