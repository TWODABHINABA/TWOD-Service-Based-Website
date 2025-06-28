'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import '../App.css';
import api from '../components/user-management/api';
import { StarsBackground } from '../components/animate-ui/backgrounds/stars';
import { Navigate, useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  let navigate = useNavigate();

  const registerRoute = (id) => {
  navigate(`/register/${id}`);
};

  return (
    <StarsBackground className="mt-20">
      <div className="min-h-screen px-4 md:px-24 lg:px-28 py-6 relative z-10 font-sans mt-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-black dark:text-white">Our Services</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-base">
            Explore the solutions we offer to help your business grow.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-black dark:text-white">Loading services...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl max-w-sm bg-white/10 dark:bg-black/20 shadow-xl backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all border-black dark:border-white"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-5xl mb-4">{service.icon || "✨"}</div>
                <h3 className="font-semibold text-xl text-red-700 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-300 dark:text-gray-400 mb-10">{service.description}</p>

                <div className="absolute bottom-4  hover:opacity-100 transition-opacity duration-500 w-full mt-30 flex justify-center">
                  <button className="px-4 py-2 text-black bg-blue-200 rounded-full hover:bg-red-200 transition duration-300" onClick={()=>registerRoute(service._id)}>
                    Register now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </StarsBackground>
  );
};

export default ServicesPage;
