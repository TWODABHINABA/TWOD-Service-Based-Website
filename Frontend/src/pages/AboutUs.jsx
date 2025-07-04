
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
      <div className="min-h-screen p-6 md:p-12 relative z-10">

        {/* About Section */}
        <About />

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto mt-12">
          <h2 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12">
            Our <span className="text-purple-500">Mission</span> & <span className="text-purple-500">Vision</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Our Mission",
                text: "To empower people and businesses with reliable, modern, and user-centric web solutions that drive growth, efficiency, and meaningful impact.",
              },
              {
                title: "Our Vision",
                text: "To become a global leader in crafting intuitive and transformative digital products — built with passion, innovation, and purpose.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-300 dark:border-white/20 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-lg p-8 hover:shadow-2xl transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto mt-28">
          <h2 className="text-4xl font-extrabold text-center text-black dark:text-white mb-16">
            Meet the <span className="text-purple-500">Team</span>
          </h2>

          {loading ? (
            <p className="text-center text-black dark:text-white text-lg">Loading team members...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-3xl p-6 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-lg border border-gray-300 dark:border-white/20 hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col items-center text-center"
                >
                  <img
                    src={
                      member.image.url ||
                      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                    }
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-black dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">{member.skill}</p>
                  <a
                    href={`${member.linkedinId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sky-700 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-transform hover:scale-110"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </a>
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
