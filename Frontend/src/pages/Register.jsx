import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarsBackground } from "../components/animate-ui/backgrounds/stars";
import { AiFillStar } from "react-icons/ai";

// Mock service data
const mockServiceData = {
  "1": {
    name: "Web Development",
    description: "Build fast, responsive websites and applications.",
  },
  "2": {
    name: "Graphic Design",
    description: "Creative logos, banners, and social media posts.",
  },
};

// Mock feedback data
const mockFeedbackData = {
  "1": [
    {
      name: "Rishi",
      rating: 5,
      comment: "Fantastic work and timely delivery!",
    },
    {
      name: "Aditya",
      image: "https://i.pravatar.cc/50?img=2",
      rating: 4,
      comment: "Good quality, would recommend.",
    },
  ],
  "2": [
    {
      name: "Mohit Raj",
      image: "https://i.pravatar.cc/50?img=6",
      rating: 5,
      comment: "Awesome design skills!",
    },
    {
      name: "Sneha Kapoor",
      image: "https://i.pravatar.cc/50?img=7",
      rating: 3,
      comment: "Decent work, communication could improve.",
    },
  ],
};

const RegisterPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const selectedService = mockServiceData[id];
    const selectedFeedbacks = mockFeedbackData[id] || [];

    if (selectedService) {
      setService(selectedService);
      setFeedbacks(selectedFeedbacks);
    }
  }, [id]);

  const handleSubmit = () => {
    const newFeedback = {
      name: newName || "Anonymous",
      image: newImage || "https://i.pravatar.cc/50",
      rating: newRating,
      comment: newComment,
    };

    setFeedbacks((prev) => [...prev, newFeedback]);
    setNewRating(5);
    setNewComment("");
    setNewName("");
    setNewImage("");

    navigate("/");
  };

  return (
    <StarsBackground>
      <div className="min-h-screen p-6 md:p-12 lg:p-20 relative z-10 text-black dark:text-white mt-20">
        {/* Service Info */}
        {service && (
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>
        )}

        {/* Feedback Box */}
        <div className="mb-10 bg-white/10 dark:bg-black/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Client Feedback</h3>

          {feedbacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.map((fb, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/20 dark:bg-black/30  flex items-start gap-4"
                >
                  <img
                    src={fb.image || "https://i.pravatar.cc/50"}
                    alt={fb.name || "Client"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg text-black dark:text-white">
                      {fb.name || "Anonymous"}
                    </h4>
                    <div className="flex items-center mb-1">
                      {[...Array(fb.rating)].map((_, i) => (
                        <AiFillStar key={i} className="text-yellow-400 text-lg" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{fb.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No feedback yet.</p>
          )}
        </div>

        {/* Feedback Form */}
        <div className="bg-white/10 dark:bg-black/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Give Your Feedback</h3>

          <input
            type="text"
            placeholder="Your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mb-2 p-2 w-full rounded text-black"
          />

          <input
            type="text"
            placeholder="Profile image URL (optional)"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="mb-4 p-2 w-full rounded text-black"
          />

          <div className="flex items-center mb-4">
            <label className="mr-4">Your Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar
                key={star}
                className={`text-3xl cursor-pointer transition ${
                  star <= newRating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setNewRating(star)}
              />
            ))}
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 rounded text-black"
            rows={4}
            placeholder="Your feedback..."
          />

          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </StarsBackground>
  );
};

export default RegisterPage;
