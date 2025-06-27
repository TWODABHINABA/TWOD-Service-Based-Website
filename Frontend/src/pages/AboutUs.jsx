'use client';
import React, { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import About from "../components/About";
import api from "../components/user-management/api";
import { StarsBackground } from "../components/animate-ui/backgrounds/stars"; 

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/team');
        setTeamMembers(res.data);
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  return (
    <StarsBackground className="mt-20">
      <div className="text-white min-h-screen p-6 md:p-12 transition-all duration-700 ease-in-out relative z-10">
        <div className="mt-20" />
        <About />

        {/* Mission & Vision Section */}
        <section className="max-w-5xl mx-auto mt-16 transition duration-700 ease-in-out hover:scale-[1.01]">
          <h2 className="text-black dark:text-white text-4xl font-extrabold mb-8 border-b-4 inline-block border-black dark:border-white pb-1">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-black border-black dark:border-white rounded-xl p-6 shadow-md border border-transparent hover:border-secondary hover:shadow-xl hover:scale-[1.03] transition-all duration-500 ease-in-out transform">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-3">Our Mission</h3>
              <p className="text-black dark:text-white text-lg leading-relaxed">
                To empower people and businesses with reliable, modern, and user-centric web solutions that drive growth, efficiency, and meaningful impact.
              </p>
            </div>
            <div className="bg-white dark:bg-black border-black dark:border-white rounded-xl p-6 shadow-md border border-transparent hover:border-secondary hover:shadow-xl hover:scale-[1.03] transition-all duration-500 ease-in-out transform">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-3">Our Vision</h3>
              <p className="text-black dark:text-white text-lg leading-relaxed">
                To become a global leader in crafting intuitive and transformative digital products — built with passion, innovation, and purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-black dark:text-white text-4xl font-extrabold mb-12 border-b-4 inline-block border-black dark:border-white pb-1">
            Meet the Team
          </h2>
          {loading ? (
            <p className="text-center text-black dark:text-white">Loading team members...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black bg-opacity-90 border-2 border-black rounded-3xl flex flex-col items-center text-center py-10 px-6 shadow-[0_4px_24px_0_rgba(255,255,255,0.5)] hover:shadow-2xl hover:scale-105 hover:border-secondary transition-all duration-500 ease-in-out"
                >
                  <img
                    src={
                      member.image ||
                      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                    }
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-secondary mb-4"
                  />
                  <h3 className="text-xl font-bold text-black dark:text-white">{member.name}</h3>
                  <p className="text-black dark:text-white text-sm mt-1">{member.skill}</p>
                  <div className="mt-4">
                    <a
                      href={`https://linkedin.com/in/${member.linkedinId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-sky-500 transition-transform transform hover:scale-110 duration-300"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </StarsBackground>
  );
};

export default AboutUs;
