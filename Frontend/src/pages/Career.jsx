import React, { useState } from "react";
import { FaMapMarkerAlt, FaTrashAlt, FaBriefcase } from "react-icons/fa";

const CareerPage = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      skills: ["React", "Tailwind", "JavaScript"],
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    skills: "",
  });

  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const isAdmin = email === "admin@example.com";

  const handleLogin = () => {
    if (email.trim()) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addJob = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.skills) return;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        title: formData.title,
        location: formData.location,
        skills: formData.skills.split(",").map((s) => s.trim()),
      },
    ]);

    setFormData({ title: "", location: "", skills: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleApply = (jobTitle) => {
    alert(`You applied for "${jobTitle}"`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Career Opportunities</h1>

        {loggedIn ? (
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Logged in as:{" "}
              <span className="font-semibold text-blue-600">{email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-1 rounded"
            />
            <button
              onClick={handleLogin}
              className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Admin Job Form */}
      {loggedIn && isAdmin && (
        <form
          onSubmit={addJob}
          className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4 mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            + Add New Job
          </h2>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Add Job
          </button>
        </form>
      )}

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition relative group"
          >
            <div className="flex items-center gap-2 text-secondary mb-2">
              <FaBriefcase />
              <h3 className="text-lg font-semibold">{job.title}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaMapMarkerAlt className="mr-1" />
              {job.location}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {isAdmin && loggedIn ? (
              <button
                onClick={() => deleteJob(job.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt />
              </button>
            ) : (
              <button
                onClick={() => handleApply(job.title)}
                className="mt-4 bg-secondary text-white w-full py-2 rounded hover:bg-primary"
              >
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPage;
