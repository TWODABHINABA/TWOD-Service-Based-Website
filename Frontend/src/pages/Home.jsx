import React, { useEffect } from 'react'
import Header from '../components/Header'
import Why from '../components/Why'
import Testimonial from '../components/Testimonial'
import About from '../components/About'
import Footer from '../components/Footer'
import Call from '../components/Call'
import { StarsBackground } from '../components/animate-ui/backgrounds/stars' 

const Home = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/';
    }
  }, []);

  return (
    <StarsBackground className="min-h-screen">
      <Header />
      <Why />
      {/* <About /> */}
      <Testimonial />
      <Call />
    </StarsBackground>
  );
};

export default Home;
