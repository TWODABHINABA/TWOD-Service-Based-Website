import React from 'react'
import Header from '../components/Header'
import Why from '../components/Why'
import Testimonial from '../components/Testimonial'
import About from '../components/About'
import Footer from '../components/Footer'
import Call from '../components/Call'

const Home = () => {
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