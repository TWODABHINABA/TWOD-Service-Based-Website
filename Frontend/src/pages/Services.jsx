// import React from "react";
// import '../App.css';
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";

// const services = [
//   {
//     name: "Web Development",
//     description:
//       "We build fully responsive, SEO-friendly, and fast websites using the latest technologies like React, Node.js, and Tailwind CSS. Tailored solutions for your business needs.",
//     icon: "🌐",
//   },
//   {
//     name: "UI/UX Design",
//     description:
//       "Designing user-friendly interfaces with a focus on aesthetics and usability. We create wireframes, prototypes, and high-fidelity designs that delight your users.",
//     icon: "🎨",
//   },
//   {
//     name: "SEO Optimization",
//     description:
//       "Improve your website ranking on Google with our comprehensive SEO strategies including keyword research, content optimization, link building, and technical SEO audits.",
//     icon: "🚀",
//   },
//   {
//     name: "Mobile App Development",
//     description:
//       "Developing native and cross-platform mobile apps for Android and iOS with smooth performance, clean UI, and integration with modern APIs.",
//     icon: "📱",
//   },
// ];

// const ServicesPage = () => {
//   return (
//     <div className="mt-20 min-h-screen px-4 md:px-24 lg:px-27 py-6">
//       <Typography
//         variant="h2"
//         className="mt-10 text-center mb-10 text-white font-bold"
//       >
//         Our Services
//       </Typography>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//         {services.map((service, index) => (
//           <Card
//             key={index}
//             className="relative group flex flex-col items-center text-center p-4 rounded-xl max-w-sm bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
//           >
//             <CardBody className="flex flex-col flex-grow group-hover:pb-10 transition-all duration-500 delay-200">
//               <div className="text-4xl mb-3 group-hover:scale-105 transition-all">{service.icon}</div>
//               <h1 className="font-semibold text-red-700 text-lg mb-1">{service.name}</h1>
//               <p className="text-gray-400 text-sm">{service.description}</p>
//             </CardBody>

//             <CardFooter className="absolute -bottom-full group-hover:bottom-1 transition-all duration-500 delay-200 w-full flex justify-evenly">
//               <button className="px-4 py-2 text-white bg-red-700 rounded-full hover:bg-red-800 transition-all duration-300">
//                 Register now
//               </button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;


import React from "react";
import { motion } from "framer-motion";

const ServicePage = () => {
  return (
    <div
      className="relative flex min-h-[80vh] flex-col bg-transparent dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <header className="min-h-[80vh] w-full flex items-center px-8 text-left">
        <div className="text-white max-w-3xl">
          <h1 className="text-4xl font-black md:text-6xl leading-tight">
            Empowering Businesses with Innovative Solutions
          </h1>
          <p className="text-base md:text-lg mt-5">
            We provide cutting-edge technology and expert consulting to help your business thrive in the digital age.
          </p>
        </div>
      </header>

      <section className="py-2 px-2 md:px-10">
        <h2 className="text-white text-4xl font-bold mb-8 text-left">Our Services</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center p-4 rounded-xl max-w-sm bg-white/10 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
              whileHover={{ rotate: 1, scale: 1.03 }}
            >
              <div className="flex flex-col flex-grow items-center transition-all duration-200">
                <div className="text-4xl mb-3 transition-transform duration-300">{service.icon}</div>
                <h1 className="font-semibold text-red-700 text-lg mb-1">{service.name}</h1>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
             
             
              <div className="absolute bottom-4 opacity-0 hover:opacity-100 transition-opacity duration-500 w-full flex justify-center">
                <button className="px-4 py-2 text-white bg-red-700 rounded-full hover:bg-red-800 transition-all duration-300">
                  Register now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

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
export default ServicePage;

