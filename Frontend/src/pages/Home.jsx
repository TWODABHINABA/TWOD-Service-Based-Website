import React from 'react'
import Header from '../components/Header'
import Why from '../components/Why'
import Testimonial from '../components/Testimonial'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Why/>
      {/* <About/> */}
      <Testimonial/>
    </div>
  )
}

export default Home