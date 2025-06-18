import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";
import api from '../components/user-management/api';
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
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await api.post(
  '/request',
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

    // Axios will only reach here if response is 2xx
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
    <div className="min-h-screen bg-gradient-to-br from-white via-white  p-6 md:p-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-secondary transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        
        <div className="p-8 bg-primary text-white flex flex-col justify-between">
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
  );
};

export default Contact;
