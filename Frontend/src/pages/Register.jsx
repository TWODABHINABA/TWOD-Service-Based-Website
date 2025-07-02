import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { StarsBackground } from "../components/animate-ui/backgrounds/stars";
import { AiFillStar } from "react-icons/ai";
import api from "../components/user-management/api";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const timeoutRef = useRef(null);

  const feedbacks = service?.feedback || [];
  const PAGE_SIZE = 3;
  const totalPages = Math.ceil(feedbacks.length / PAGE_SIZE);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (totalPages > 1) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setPage((prevPage) => (prevPage + 1) % totalPages);
      }, 3000);
      return () => resetTimeout();
    }
  }, [page, service, totalPages]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/services/${id}`);
      
      setService(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch service data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const newFeedback = {
        name: newName || "Anonymous",
        stars: newRating,
        message: newComment,
      };

      await api.post(`/services/${id}/feedback`, newFeedback);

      setNewRating(5);
      setNewComment("");
      setNewName("");
      // Refetch service to show new feedback
      fetchService();
    } catch (error) {
      console.error("Failed to submit feedback", error);
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  if (loading) {
    return (
      <StarsBackground>
        <div className="min-h-screen flex items-center justify-center text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
          />
        </div>
      </StarsBackground>
    );
  }

  if (error) {
    return (
      <StarsBackground>
        <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">
          {error}
        </div>
      </StarsBackground>
    );
  }

  return (
    <StarsBackground>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen p-4 md:p-8 lg:p-12 relative z-10 text-black dark:text-white mt-20"
      >
        {/* Service Info */}
        {service && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <h2 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {service.name}
            </h2>
            {service.offerDetails.map((od, index) => (
              <div
                key={index}
                className="mb-6 max-w-xl mx-auto bg-white/20 dark:bg-black/30 rounded-2xl shadow-lg border border-blue-400/30 p-6 flex flex-col items-center"
              >
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">{od.description.heading}</h3>
                  <span className="ml-2 px-4 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-lg font-semibold shadow">
                    ${od.price}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 text-lg w-full mt-2 pl-4">
                  {od.description.features.map((feature, i) => (
                    <li key={i} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
            
          </motion.div>
        )}

        {/* Feedback Carousel */}
        <div className="mb-20 relative">
          <h3 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Client Feedback
          </h3>
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${page * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {totalPages > 0 ? (
                Array.from({ length: totalPages }).map((_, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {feedbacks
                        .slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE)
                        .map((fb, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className="p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm flex items-start gap-5 border border-purple-500/30 shadow-lg shadow-purple-500/20 transition-all duration-300 h-full"
                          >
                            <img
                              src={
                                fb.image ||
                                `https://i.pravatar.cc/50?u=${fb.name}`
                              }
                              alt={fb.name || "Client"}
                              className="w-14 h-14 rounded-full object-cover border-2 border-purple-400"
                            />
                            <div className="text-left">
                              <h4 className="font-semibold text-xl text-black dark:text-white">
                                {fb.name || "Anonymous"}
                              </h4>
                              <div className="flex items-center my-2">
                                {[...Array(fb.stars)].map((_, i) => (
                                  <AiFillStar
                                    key={i}
                                    className="text-yellow-400 text-lg"
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 italic">
                                "{fb.message}"
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">
                  No feedback yet. Be the first to leave a review!
                </p>
              )}
            </motion.div>
          </div>
          {totalPages > 1 && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    page === i
                      ? "bg-purple-500 scale-125"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-blue-500/20 border border-blue-500/30 max-w-2xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Share Your Experience
          </h3>

          <input
            type="text"
            placeholder="Your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mb-4 p-3 w-full rounded-lg text-black bg-white/80 dark:bg-black/30 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all"
          />

          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div key={star} whileHover={{ scale: 1.2 }}>
                <AiFillStar
                  className={`text-5xl cursor-pointer transition-colors ${
                    star <= newRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  onClick={() => setNewRating(star)}
                />
              </motion.div>
            ))}
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 rounded-lg text-black bg-white/80 dark:bg-black/30 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all"
            rows={5}
            placeholder="Tell us about your experience..."
          />

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold text-lg"
          >
            Submit Feedback
          </motion.button>
        </motion.div>
      </motion.div>
    </StarsBackground>
  );
};

export default RegisterPage;
