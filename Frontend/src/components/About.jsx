import React from 'react';
import { Icon } from '@iconify/react'; 

const About = () => {
  return (
    <div className="py-18 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">

        {/* Logo Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://i0.wp.com/thewallofdreams.com/wp-content/uploads/2025/03/logo_twod-removebg-preview.png?w=846&ssl=1"
            alt="TWOD Logo"
            className="w-64 sm:w-80 lg:w-96"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-8 ">
          <div>
            <h1 className="text-4xl font-extrabold text-primary relative inline-block">
              Our Story
              <span className="block w-25 h-1 bg-secondary mt-2 rounded-full"></span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Welcome to <strong className="text-primary">TWOD</strong>, your trusted partner for accessible and personalized web solutions.
              We blend design and development with creativity and performance to bring your digital dreams to life.
              Whether you're a business, startup, or visionary individual — we're here to make your online journey seamless.
            </p>
          </div>

          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">How We Help</h3>
            <div className="space-y-6">

              
              <div className="flex items-start gap-4">
                <span className="text-2xl text-secondary">➜</span>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Choose a Specialist</h4>
                  <p className="text-gray-700  mt-1 text-lg">
                    Work with our experienced designers, developers, or strategists — handpicked for your goals.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <span className="text-2xl text-secondary">➜</span>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Make a Schedule</h4>
                  <p className="text-gray-700  mt-1 text-lg">
                    Flexible milestones and collaborative planning keep your project on track and transparent.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <span className="text-2xl text-secondary">➜</span>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Get Your Website</h4>
                  <p className="text-gray-700  mt-1 text-lg">
                    Launch a responsive, high-performing website that reflects your vision and drives results.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
