import React, { useState, useEffect } from "react";
import '../App.css';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
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
    <div className="mt-20 min-h-screen px-4 md:px-24 lg:px-28 py-6">
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
            <Card key={index} className="w-96 bg-zinc-800 dark:bg-yellow-300 backdrop-blur rounded-xl shadow-xl p-4">
              <CardBody>
                <div className="text-5xl mb-4 text-white dark:text-blue-800">{service.icon || "✨"}</div>

                <Typography variant="h5" color="blue-gray" className="mb-2 text-yellow-400 dark:text-blue-700">
                  {service.name}
                </Typography>

                <Typography className="text-white dark:text-black text-sm">
                  {service.description}
                </Typography>
              </CardBody>

              <CardFooter className="pt-0">
                <a href="#" className="inline-block">
                  <Button size="sm" variant="text" className="text-bold flex items-center gap-2 text-white dark:text-white bg-indigo-500 shadow-lg shadow-indigo-500/50  border rounded-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                    Register
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
