import React from "react";
import './Contact.css';
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
    <div className="min-h-screen bg-gray-100 p-6">
      <Typography
        variant="h2"
        className="text-center mb-10 text-gray-800 font-bold"
      >
        Our Services
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="p-6 rounded-2xl shadow-md hover:shadow-xl flex flex-col">
            <CardBody className="flex flex-col flex-grow">
              <div className="text-6xl mb-5">{service.icon}</div>
              <Typography variant="h5" color="blue-gray" className="mb-3 font-semibold">
                {service.name}
              </Typography>
              <Typography className="text-gray-600 flex-grow">{service.description}</Typography>
            </CardBody>

            <CardFooter className="pt-0  space-x-4">
              

              {/* <Button
                size="sm"
                variant="filled"
                className="bg-primary hover:bg-secondary "
              >
                Request Now
              </Button> */}

          {/* <!-- From Uiverse.io by faizanullah1999 -->  */}
              <div class="button-borders">
                <button class="primary-button">
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
