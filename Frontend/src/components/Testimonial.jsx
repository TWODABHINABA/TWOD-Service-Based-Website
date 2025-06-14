import React, { useEffect, useRef } from "react";
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
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
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

  return (
    <section id="testimonial" className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto max-w-screen-xl px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Clients Say
        </h2>
        <Slider {...settings}>
          {testimonialData.map((item, index) => (
            <div key={index}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white rounded-2xl m-4 p-6 my-10 relative ${
                  index % 2 ? "shadow-lg" : "shadow-md"
                }`}
              >
                <div className="absolute top-[-45px] left-6">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow"
                  />
                </div>
                <h4 className="text-base font-normal text-gray-700 mt-8 mb-4">{item.comment}</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.profession}</p>
                  </div>
                  <div className="flex">{renderStars(item.rating)}</div>
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
