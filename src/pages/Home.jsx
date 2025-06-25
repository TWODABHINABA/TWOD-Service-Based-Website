import React from 'react'
import Header from '../components/Header'
import Why from '../components/Why'
import Testimonial from '../components/Testimonial'
import About from '../components/About'
import Footer from '../components/Footer'
import Call from '../components/Call'
import { useEffect } from 'react';




const Home = () => {
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    // Save to localStorage or cookie
    localStorage.setItem('token', token);

    // Optionally, redirect to dashboard or fetch user info
    window.location.href = '/'; // or your route
  }
}, []);
  return (
    <div>
      <Header/>
      <Why/>
      {/* <About/> */}
      <Testimonial/>
      <Call/>
    </div>
  )
}

export default Home