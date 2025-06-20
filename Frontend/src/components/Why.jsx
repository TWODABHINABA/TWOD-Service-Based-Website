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
    <div ref={sectionRef} className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
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
              desc: 'Each website is tailored to reflect your brand identity with unique and engaging design.',
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
              <div class="card">
              <div class="card__shine"></div>
              <div class="card__glow"></div>
              <div class="card__content">

              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            
             </div>
              <div class="card__footer">
                <div class="card__price">$49.99</div>
                <div class="card__button">
                  <svg height="16" width="16" viewBox="0 0 24 24">
                    <path
                      stroke-width="2"
                      stroke="currentColor"
                      d="M4 12H20M12 4V20"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
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



