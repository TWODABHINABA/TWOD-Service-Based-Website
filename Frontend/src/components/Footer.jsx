import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneAlt, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-white to-primary text-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        
        <div>
          <h1 className="text-2xl font-bold text-primary mb-4">The Wall of Dream</h1>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <CiLocationOn className="text-xl text-secondary mt-1" />
              <p>64, Kakde Nagar Rd, Kondhwa Budruk, Pune, Maharashtra 411048</p>
            </div>
            <div className="flex items-center gap-2">
              <TfiEmail className="text-lg text-secondary" />
              <a href="mailto:info@thewallofdreams.com" className="hover:underline">
                info@thewallofdreams.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-lg text-secondary" />
              <a href="tel:+919049011190" className="hover:underline">
                +91 90490 11190
              </a>
            </div>
          </div>
        </div>

       
        <div>
          <h1 className="text-2xl font-bold text-primary mb-4">About Us</h1>
          <div className="flex flex-col space-y-3 text-sm">
            <a href="#" className="hover:text-secondary">About</a>
            <a href="#" className="hover:text-secondary">Careers</a>
            <a href="#" className="hover:text-secondary">Contact</a>
          </div>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">Don't miss our future updates</h2>
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

      
      <div className="text-center text-sm mt-12 text-gray-600">
        &copy; {new Date().getFullYear()} The Wall of Dream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
