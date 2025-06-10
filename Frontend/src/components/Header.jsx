import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white ">
      <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 xl:gap-0 lg:py-28 lg:grid-cols-12">
       
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-primary">
            Building Website and Landing Page.
          </h1>
         <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
  The walls of Dream provide service to make the websites. We specialize in crafting visually appealing, fast, and responsive websites tailored to your brand. From landing pages to full-stack applications, our team ensures quality design and seamless user experiences to help your digital presence stand out.
</p>

          <a
            href="https://github.com"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.2 23.1c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.9-1.7-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.2-3.2 0-.3-.5-1.4.1-2.9 0 0 1-.3 3.2 1.2.9-.3 1.9-.5 2.9-.5s2 .2 2.9.5c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.6.1 2.9.7.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.5.4 1 .1 1.3 1.7v2.5c0 .4.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"
                clipRule="evenodd"
              />
            </svg>
            View on GitHub
          </a>
        </div>

        
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://themewagon.github.io/landwind/images/hero.png"
            alt="hero mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
