import React, { useState } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const newFeedback = {
      id: Date.now(),
      name,
      message,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setName("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 md:px-20">
      <h2 className="text-4xl font-bold mb-8 text-center">Feedback</h2>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md mb-10 max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none h-28 resize-none"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 rounded bg-red-700 hover:bg-red-800 transition-all duration-300"
        >
          Submit
        </button>
      </form>

      <div className="max-w-2xl mx-auto space-y-6">
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-400">No feedback yet. Be the first!</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white/10 backdrop-blur p-5 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-red-500 font-semibold">{fb.name}</h4>
              <p className="text-gray-300 mt-1">{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
