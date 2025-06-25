import React, { useState, useEffect } from "react";
import '../App.css';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import api from '../components/user-management/api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/services');
        console.log("Fetched services:", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="mt-20 min-h-screen px-4 md:px-24 lg:px-27 py-6">
      <Typography
        variant="h2"
        className="mt-10 text-center mb-10 text-black dark:text-white font-bold"
      >
        Our Services
      </Typography>

      {loading ? (
        <p className="text-white text-center">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <Card
              key={index}
              className="relative group flex flex-col items-center text-center p-4 rounded-xl max-w-sm bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <CardBody className="flex flex-col flex-grow group-hover:pb-10 transition-all duration-500 delay-200">
                <div className="text-4xl mb-3 group-hover:scale-105 transition-all">{service.icon}</div>
                <h1 className="font-semibold text-red-700 text-lg mb-1">{service.name}</h1>
                {/* <p className="font-bold text-white text-xl mb-2">{service.price}</p> */}
                <p className="text-gray-400 text-sm">{service.description}</p>
              </CardBody>

              <CardFooter className="absolute -bottom-full group-hover:bottom-1 transition-all duration-500 delay-200 w-full flex justify-evenly">
                <button className="px-4 py-2 text-white bg-red-700 rounded-full hover:bg-red-800 transition-all duration-300">
                  Register now
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
