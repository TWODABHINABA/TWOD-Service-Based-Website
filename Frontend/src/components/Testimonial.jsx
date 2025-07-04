
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 17);  // 6 AM to 5:59 PM is Daytime
  }, []);

  const testimonialData = [
    {
      name: "Jane Doe",
      profession: "UX Designer",
      comment: "TWOD transformed our web presence with speed and creativity!",
      imgSrc: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.5,
    },
    {
      name: "John Smith",
      profession: "Startup Founder",
      comment: "Their design and development services are top-notch.",
      imgSrc: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
    },
    {
      name: "Alex Johnson",
      profession: "Freelancer",
      comment: "Impressed with the quality and speed of delivery!",
      imgSrc: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 4,
    },
    {
      name: "Emily Clark",
      profession: "Marketing Lead",
      comment: "Reliable, efficient, and very communicative throughout the project.",
      imgSrc: "https://randomuser.me/api/portraits/women/47.jpg",
      rating: 5,
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  useEffect(() => {
    gsap.set("#pendulum", { rotate: -15 });
    gsap.to("#pendulum", {
      rotate: 15,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1, dots: false } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 1, dots: false } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false } },
    ],
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} icon="tabler:star-filled" className="text-yellow-500 text-xl" />
        ))}
        {halfStars > 0 && (
          <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-xl" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} icon="tabler:star-filled" className="text-gray-400 text-xl" />
        ))}
      </>
    );
  };

  // ✅ Card Styling Based on Time
  const cardBackground = isDay
    ? 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
    : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700';
  const cardShadow = isDay
    ? '0 4px 24px rgba(0,0,0,0.2)'
    : '0 4px 24px rgba(255,255,255,0.2)';
  const textColor = isDay ? 'text-black' : 'text-white';
  const contentBg = isDay ? 'bg-white bg-opacity-90' : 'bg-black bg-opacity-90';

  return (
    <section id="testimonial" className="py-16 relative" ref={sectionRef}>
      {/* Pendulum */}
      <div
        id="pendulum"
        className="absolute left-[20%] md:left-1/3 top-20 md:top-16 flex flex-col items-center z-10"
        style={{ transformOrigin: "50% 0%" }}
      >
        <div className="w-3 h-3 rounded-full bg-[#656565] relative z-10"></div>
        <div
          className="absolute top-2 flex flex-col items-center md:w-96 w-40"
          style={{ transformOrigin: "center top" }}
        >
          <svg className="h-16 md:h-44" width="100%" height="100%">
            <line x1="49%" y1="-2" x2="15%" y2="100%" stroke="#656565" strokeWidth="2" />
            <line x1="51%" y1="-2" x2="85%" y2="100%" stroke="#656565" strokeWidth="2" />
          </svg>
          <div className="bg-orange-400 text-white px-6 py-2 rounded-md shadow-lg relative">
            <span className="text-lg sm:text-lg md:text-xl lg:text-3xl font-bold text-center whitespace-nowrap">
              What users say about us
            </span>
            <div className="absolute inset-0 border-2 border-dashed border-white rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="mt-20 container mx-auto max-w-screen-xl px-4">
        <Slider {...settings}>
          {testimonialData.map((item, index) => (
            <div key={index}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className={`rounded-2xl m-4 p-6 my-10 relative ${cardBackground}`}
                style={{ boxShadow: cardShadow }}
              >
                <div className="absolute top-[-45px] left-6">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-black shadow-md"
                  />
                </div>
                <div className={`flex pr-10 ${contentBg}`}>
                  <div className="clint-card-details">
                    <h4 className={`text-base font-normal mt-8 mb-4 ${textColor}`}>
                      {item.comment}
                    </h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`text-lg font-semibold ${textColor}`}>{item.name}</h3>
                        <p className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-400'}`}>
                          {item.profession}
                        </p>
                      </div>
                      <div className="flex">{renderStars(item.rating)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
