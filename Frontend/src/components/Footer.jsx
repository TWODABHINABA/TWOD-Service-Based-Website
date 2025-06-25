import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneAlt, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Observe changes on <html> class attribute
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`py-12 px-6 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#1a1a1a] to-[#000000] text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className={`${isDark ? "bg-white" : "bg-black"} h-0.5 mb-4 w-full`}></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 my-10">
        {/* Contact Info */}
        <div>
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? "text-primary" : "text-black"}`}>
            The Wall of Dream
          </h1>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <CiLocationOn className={`text-xl mt-1 ${isDark ? "text-secondary" : "text-blue-600"}`} />
              <p>64, Kakde Nagar Rd, Kondhwa Budruk, Pune, Maharashtra 411048</p>
            </div>
            <div className="flex items-center gap-2">
              <TfiEmail className={`text-lg ${isDark ? "text-secondary" : "text-blue-600"}`} />
              <a href="mailto:info@thewallofdreams.com" className="hover:underline">
                info@thewallofdreams.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className={`text-lg ${isDark ? "text-secondary" : "text-blue-600"}`} />
              <a href="tel:+919049011190" className="hover:underline">
                +91 90490 11190
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>About Us</h1>
          <div className="flex flex-col space-y-3 text-sm">
            <a href="#" className="hover:text-secondary">
              About
            </a>
            <a href="/career" className="hover:text-secondary">
              Careers
            </a>
            <a href="#" className="hover:text-secondary">
              Contact
            </a>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? "text-primary" : "text-black"}`}>
            Don't miss our future updates
          </h2>
          <div className="flex gap-5">
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
      </div>

      {/* Copyright */}
      <div className={`text-center text-sm mt-12 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        &copy; {new Date().getFullYear()} The Wall of Dream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
