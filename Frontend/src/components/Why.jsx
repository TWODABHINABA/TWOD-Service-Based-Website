import React from 'react';

const Why = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Why Choose Our TWOD Services
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          At TWOD (The Walls of Dream), we go beyond just building websites. We help you create a powerful digital presence that drives results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Optimized</h3>
            <p className="text-gray-600">
              We build lightning-fast websites with optimized code and best practices for SEO and performance.
            </p>
          </div>

          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
            <p className="text-gray-600">
              Each website is tailored to reflect your brand identity with unique and engaging design.
            </p>
          </div>

          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Client-Centric Approach</h3>
            <p className="text-gray-600">
              We work closely with clients at every step, ensuring satisfaction and transparency throughout the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
