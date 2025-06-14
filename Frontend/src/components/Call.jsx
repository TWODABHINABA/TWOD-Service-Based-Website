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
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
