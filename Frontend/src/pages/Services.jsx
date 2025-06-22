import React from "react";
import '../App.css';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


const services = [
  {
    name: "Web Development",
    description:
      "We build fully responsive, SEO-friendly, and fast websites using the latest technologies like React, Node.js, and Tailwind CSS. Tailored solutions for your business needs.",
    icon: "🌐",
  },
  {
    name: "UI/UX Design",
    description:
      "Designing user-friendly interfaces with a focus on aesthetics and usability. We create wireframes, prototypes, and high-fidelity designs that delight your users.",
    icon: "🎨",
  },
  {
    name: "SEO Optimization",
    description:
      "Improve your website ranking on Google with our comprehensive SEO strategies including keyword research, content optimization, link building, and technical SEO audits.",
    icon: "🚀",
  },
  {
    name: "Mobile App Development",
    description:
      "Developing native and cross-platform mobile apps for Android and iOS with smooth performance, clean UI, and integration with modern APIs.",
    icon: "📱",
  },
];

const ServicesPage = () => {
  return (
    <div className="mt-20 min-h-screen px-4 md:px-24 lg:px-27 py-6">
      <Typography
        variant="h2"
        className="mt-10 text-center mb-10 text-white font-bold"
      >
        Our Services
      </Typography>
      {/* Add horizontal padding for left and right gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="p-4 rounded-xl shadow-none border border-gray-200 bg-transparent flex flex-col shadow-[0_4px_24px_0_rgba(255,255,255,0.5)]"
            style={{ minHeight: "auto" }}
          >
            <CardBody className="flex flex-col flex-grow">
              <div className="text-4xl mb-3">{service.icon}</div>
              <Typography variant="h6" color="blue-gray" className="text-gray-200 mb-2 font-semibold">
                {service.name}
              </Typography>
              <Typography className="text-gray-400 text-sm flex-grow">{service.description}</Typography>
            </CardBody>
            <CardFooter className="pt-0 space-x-4">
              <div className="button-borders">
                <button className="primary-button">
                  Register now
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
