
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import About from "../components/About";

const teamMembers = [
  {
    name: "Abhinaba Das",
    role: "Backend Developer",
    bio: "Loves building scalable backend systems and APIs.",
    image: "/team/abhinaba.png",
    linkedin: "/",
  },
  {
    name: "Aditya Jaiswal",
    role: "Frontend Developer",
    bio: "Passionate about creating responsive and user-friendly web interfaces.",
    image: "/team/aditya.png",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-jaiswal-4a986b257/",
  },
  {
    name: "Ravi Verma",
    role: "UI/UX Designer",
    bio: "Focused on crafting clean and intuitive user experiences.",
    image: "/team/ravi.png",
    linkedin: "https://linkedin.com/in/raviverma",
  },
];

const AboutUs = () => {
  return (
    <div className="mt-20">
      <div className="text-white min-h-screen p-6 md:p-12 transition-all duration-700 ease-in-out">
        <div className="mt-20"></div>
        <About />

        <section className="max-w-5xl mx-auto mt-16 transition duration-700 ease-in-out hover:scale-[1.01]">
          <h2 className="text-white text-4xl font-extrabold mb-8 border-b-4 inline-block border-secondary pb-1">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-md border border-transparent hover:border-secondary hover:shadow-xl hover:scale-[1.03] transition-all duration-500 ease-in-out transform">
              <h3 className="text-2xl font-semibold text-secondary mb-3">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To empower people and businesses with reliable, modern, and user-centric web solutions that drive growth, efficiency, and meaningful impact.
              </p>
            </div>
            <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-md border border-transparent hover:border-secondary hover:shadow-xl hover:scale-[1.03] transition-all duration-500 ease-in-out transform">
              <h3 className="text-2xl font-semibold text-secondary mb-3">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become a global leader in crafting intuitive and transformative digital products — built with passion, innovation, and purpose.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-white text-4xl font-extrabold mb-12 border-b-4 inline-block border-secondary pb-1">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-90 border-2 border-white rounded-3xl flex flex-col items-center text-center py-10 px-6 shadow-[0_4px_24px_0_rgba(255,255,255,0.5)] hover:shadow-2xl hover:scale-105 hover:border-secondary transition-all duration-500 ease-in-out"
              >
                <img
                  src={"https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-secondary mb-4"
                />
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                <div className="mt-4">
                  <a
                    href={member.linkedin}
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
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

