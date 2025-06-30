'use client';
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";
import api from '../components/user-management/api';
import '../App.css';
import { StarsBackground } from "../components/animate-ui/backgrounds/stars"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    if (!token) {
      alert("Please log in to submit the form.");
      return;
    }

    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post('/request', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 201) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <StarsBackground className="mt-20">
      <div className="mt-50 min-h-screen from-white via-white p-6 md:p-16 relative z-10">
        <div className="mt-10" />
        <div className="mt-50 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Section */}
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-black">Contact Us</h2>
            <p className="text-gray-600">We'd love to hear from you. Fill out the form and we’ll get back to you shortly.</p>

            {submitted ? (
              <p className="text-green-600 font-medium">Thanks! Your message has been sent.</p>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>

                <button disabled={isSubmitting} className="button" type="submit">
                  <div className="outline bg-purple-500 dark:bg-gray-600"></div>
                  {!submitted ? (
                    <div className="state state--default text-white ">
                      <div className="icon"></div>
                      <p>
                        {"Send Message".split("").map((char, i) => (
                          <span key={i} style={{ "--i": i }}>{char}</span>
                        ))}
                      </p>
                    </div>
                  ) : (
                    <div className="state state--sent">
                      <div className="icon">
                        <svg stroke="black" strokeWidth="0.5px" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g style={{ filter: "url(#shadow)" }}>
                            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="currentColor"></path>
                            <path d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" fill="currentColor"></path>
                          </g>
                        </svg>
                      </div>
                      <p>
                        {"Sent!".split("").map((char, i) => (
                          <span key={i} style={{ "--i": i }}>{char}</span>
                        ))}
                      </p>
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Section */}
          <div className="p-8 bg-violet-400 dark:bg-slate-400 text-black flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <div className="flex items-center gap-4">
                <FaPhone size={20} />
                <span>+91 90490 11190</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope size={20} />
                <span>thewallofdreams10@gmail.com</span>
              </div>

              <div className="flex gap-5 mt-4">
                <a
                  href="https://www.linkedin.com/company/the-wall-of-dreams/posts/?feedView=all"
                  className="hover:text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.instagram.com/the_wallofdreams/?igsh=czBibjN1eHBueHNz#"
                  className="hover:text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.222329202456!2d73.8788874!3d18.4577018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf3dcf3305d%3A0x2233bd7b5df21820!2s64%2C%20Kakde%20Nagar%20Rd%2C%20Kondhwa%20Budruk%2C%20Pune%2C%20Maharashtra%20411048!5e0!3m2!1sen!2sin!4v1718175207000!5m2!1sen!2sin"
                className="w-full h-56 rounded-xl border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </StarsBackground>
  );
};

export default Contact;
