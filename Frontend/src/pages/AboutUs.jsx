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

      
      {/* <section className="max-w-5xl mx-auto mt-12 transition duration-700 ease-in-out hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold mb-6 border-b-4 inline-block border-secondary pb-1 text-primary">
          Our Story
        </h2>
        <div className="grid md:grid-cols-2 gap-11 items-center">
          <div>
            <p className="text-lg leading-relaxed text-primary">
              Our journey began with a shared passion for innovation and a drive to
              simplify digital experiences. What started as a small group of tech
              enthusiasts soon transformed into a collaborative powerhouse.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-primary">
              Today, we are a diverse, driven team delivering real-world solutions,
              combining creativity, empathy, and cutting-edge technology.
            </p>
          </div>
          <div>
            <img
              src="https://sonic-astro-template.vercel.app/images/about/who-we-are.webp"
              alt="Our Story"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div> */}
      {/* </section> */}

      
      <section className="max-w-5xl mx-auto mt-16 transition duration-700 ease-in-out hover:scale-[1.01]">
        <h2 className="text-white text-4xl font-extrabold mb-8 border-b-4 inline-block border-secondary pb-1 text-primary">
          Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-md hover:shadow-xl transition duration-500">
            <h3 className="text-2xl font-semibold text-secondary mb-3">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To empower people and businesses with reliable, modern, and
              user-centric web solutions that drive growth, efficiency, and
              meaningful impact.
            </p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-6 shadow-md hover:shadow-xl transition duration-500">
            <h3 className="text-2xl font-semibold text-secondary mb-3">Our Vision</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To become a global leader in crafting intuitive and transformative
              digital products — built with passion, innovation, and purpose.
            </p>
          </div>
        </div>
      </section>

      
      <section className="max-w-5xl mx-auto mt-20">
        <h2 className="text-white text-4xl font-extrabold mb-12 border-b-4 inline-block border-secondary pb-1 text-primary">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {teamMembers.map((member, index) => (
            
            <div
              key={index}
              className="bg-black bg-opacity-90 border-4 border-white rounded-2xl flex flex-col items-center text-center rounded-3xl py-10 px-6 shadow-[0_4px_24px_0_rgba(255,255,255,0.5)]"
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
                  className="text-sky-700 hover:text-sky-500 transition"
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
