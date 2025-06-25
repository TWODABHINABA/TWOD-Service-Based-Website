import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../pages/Contact.css'

gsap.registerPlugin(ScrollTrigger);

const Why = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-white text-4xl font-extrabold text-gray-900 mb-4">
          Why Choose Our TWOD Services
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          At TWOD (The Walls of Dream), we go beyond just building websites. We help you create a powerful digital presence that drives results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Fast & Optimized',
              desc: 'We build lightning-fast websites with optimized code and best practices for SEO and performance.',
            },
            {
              icon: '🎨',
              title: 'Custom Design',
              desc: 'Each website is tailored to reflect your brand identity with unique and engaging design and nice product.',
            },
            {
              icon: '🤝',
              title: 'Client-Centric Approach',
              desc: 'We work closely with clients at every step, ensuring satisfaction and transparency throughout the project.',
            },
          ].map((card, index) => (

            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div
                className="card custom-card relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-1 transition-transform transform hover:scale-105"
                style={{
                  
                  boxShadow: '0 4px 24px 0 rgba(255,255,255,0.25)',
                }}
              >
                <div className="card__shine absolute inset-0 pointer-events-none"></div>
                <div className="card__glow absolute -inset-2 blur-2xl opacity-30 bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500"></div>
                <div className="card__content relative z-10 bg-black bg-opacity-90 text-white p-8 rounded-xl flex flex-col items-center">
                  <div className="text-5xl mb-4">{card.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-center">{card.desc}</p>
                </div>
                <div className="card__footer relative z-10 text-center mt-4">
                  <div className="card__price text-lg font-semibold text-white mb-2">$49.99</div>
                  <button className="card__button inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
                    <svg height="18" width="18" viewBox="0 0 24 24" fill="none">
                      <path
                        strokeWidth="2"
                        stroke="currentColor"
                        d="M4 12H20M12 4V20"
                        fill="none"
                      ></path>
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Why;



