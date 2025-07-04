import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import AutoLogout from './AutoLogout';
import api from './components/user-management/api';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import CareerPage from './pages/Career';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Footer from './components/Footer';

import AdminLayout from './pages/Admin/AdminLayout';

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
        console.error('Failed to fetch user:', err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isAdminDashboard = isAdmin && location.pathname.startsWith('/admin');

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      {isAuthenticated && <AutoLogout />}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<CareerPage user={user} />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {isAdmin ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : (
          location.pathname.startsWith('/admin') && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminDashboard && <Footer />}
    </div>
  );
};

export default App;
