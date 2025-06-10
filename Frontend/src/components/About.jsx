import React from 'react';
import { Icon } from '@iconify/react'; // Optional: for better arrows, else use ➜

const About = () => {
  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        
        
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src="https://i0.wp.com/thewallofdreams.com/wp-content/uploads/2025/03/logo_twod-removebg-preview.png?w=846&ssl=1"
            alt="TWOD Logo"
            className="max-w-xs lg:max-w-md"
          />
        </div>

        
        <div className="w-full lg:w-1/2 lg:pl-12">
          <h1 className="text-3xl font-bold text-secondary mb-2 relative inline-block">
            About Us
            <span className="block w-24 h-1 bg-primary mt-2"></span>
          </h1>

          <p className="text-primary text-lg md:text-xl leading-relaxed mb-8">
            Welcome to <strong>TWOD</strong>, your trusted partner for accessible and personalized website services.
            Our expert team offers specialized design and development solutions that prioritize creativity, performance,
            and client satisfaction. Whether you're a startup, a business, or an individual with a vision — we're here to bring it to life.
            Join us on this exciting journey to build your dream digital presence.
          </p>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Solutions</h3>
            <div className="flex flex-col gap-6">
  <div>
    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
      <span>➜</span> Choose a Specialist
    </h4>
    <p className="text-gray-700 text-base md:text-lg mt-2">
      Select from a range of skilled professionals — designers, developers, and strategists — tailored to your specific needs.
    </p>
  </div>
  <div>
    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
      <span>➜</span> Make a Schedule
    </h4>
    <p className="text-gray-700 text-base md:text-lg mt-2">
      Easily plan timelines that work for you. We offer flexible project phases with milestone updates.
    </p>
  </div>
  <div>
    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
      <span>➜</span> Get Your Website
    </h4>
    <p className="text-gray-700 text-base md:text-lg mt-2">
      Receive a fully functional, responsive, and optimized website — ready to impress and perform.
    </p>
  </div>
</div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
