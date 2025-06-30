'use client';
import React from 'react';
import { StarsBackground } from './animate-ui/backgrounds/stars';
import { FaUserFriends, FaRegClock, FaCode } from 'react-icons/fa';

const About = () => {
  return (
    <StarsBackground className="py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 space-y-24">

        {/* Hero Row */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-5xl font-extrabold text-black dark:text-white leading-tight">
              Empowering Digital Journeys with <span className="text-purple-600 dark:text-purple-500">TWOD</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At <strong>TWOD</strong>, we build intuitive, performance-driven web experiences that connect ideas with innovation. From startups to enterprises, we turn bold visions into high-impact realities.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative bg-white dark:bg-white backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
              <div className="absolute -inset-1 rounded-3xl blur-3xl bg-gradient-to-br from-secondary to-purple-600 opacity-50 scale-110 z-0" />
              <img
                src="https://i0.wp.com/thewallofdreams.com/wp-content/uploads/2025/03/logo_twod-removebg-preview.png?w=846&ssl=1"
                alt="TWOD Logo"
                className="relative z-10 w-64 sm:w-72 md:w-80 drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-center text-black dark:text-white">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* Feature 1 */}
            <div className="bg-white dark:bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 dark:border-white border-black">
              <div className="text-secondary text-3xl mb-4 mx-auto w-fit p-3 rounded-full bg-black dark:bg-white">
                <FaUserFriends />
              </div>
              <h4 className="text-lg font-semibold text-black dark:text-white mb-2">Expert Collaboration</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Work directly with top-tier designers, developers, and thinkers who care about your success.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 dark:border-white border-black text-center shadow-md hover:shadow-xl transition-all duration-300">
              <div className="text-secondary text-3xl mb-4 mx-auto w-fit p-3 rounded-full bg-black dark:bg-white">
                <FaRegClock />
              </div>
              <h4 className="text-lg font-semibold text-black dark:text-white mb-2">Seamless Scheduling</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Stay on track with flexible planning, well-defined sprints, and transparent progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 dark:border-white border-black text-center shadow-md hover:shadow-xl transition-all duration-300">
              <div className="text-secondary text-3xl mb-4 mx-auto w-fit p-3 rounded-full bg-black dark:bg-white">
                <FaCode />
              </div>
              <h4 className="text-lg font-semibold text-black dark:text-white mb-2">Impactful Delivery</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Launch beautiful, performant websites and apps that resonate with users and drive results.
              </p>
            </div>
          </div>
        </div>

      </div>
    </StarsBackground>
  );
};

export default About;
