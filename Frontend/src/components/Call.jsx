import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={ctaRef} className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Let’s Work Together
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Ready to bring your ideas to life? Whether it’s a stunning website, a powerful app,
          or a fresh digital strategy — we’re here to help!
        </p>
      <button
        className="contactbtn rounded-full bg-white text-indigo-700 font-semibold px-8 py-3 shadow-lg hover:bg-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 animate-bounce"
      >
        <a href="/contact" className="block w-full h-full">
          Contact Us
        </a>
      </button>
      {/* <button class="contactbtn"><a href="/contact" > Contact Us </a></button> */}
      
      </div>
    </section>
  );
};

export default CallToAction;


