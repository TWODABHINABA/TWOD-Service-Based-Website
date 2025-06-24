import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi'; // Import delete icon

const AddJob = () => {
  const [jobData, setJobData] = useState({
    name: '',
    description: '',
    skills: '',
    degree: '',
    perks: '',
  });

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobList')) || [];
    setJobList(storedJobs);
  }, []);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobList, jobData];
    setJobList(updatedJobs);
    localStorage.setItem('jobList', JSON.stringify(updatedJobs));
    alert('Job added successfully!');
    setJobData({
      name: '',
      description: '',
      skills: '',
      degree: '',
      perks: '',
    });
  };

  const handleDelete = (index) => {
    const updatedJobs = [...jobList];
    updatedJobs.splice(index, 1);
    setJobList(updatedJobs);
    localStorage.setItem('jobList', JSON.stringify(updatedJobs));
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 px-4 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center">Add New Job</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Job Name</label>
            <input
              type="text"
              name="name"
              value={jobData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Required Degree</label>
            <input
              type="text"
              name="degree"
              value={jobData.degree}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Required Skills</label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. React, Node, MongoDB"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Perks</label>
            <input
              type="text"
              name="perks"
              value={jobData.perks}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            >
              Submit Job
            </button>
          </div>
        </form>
      </div>

      {/* Job List */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Job Listings</h3>
        {jobList.length === 0 ? (
          <p className="text-gray-300">No jobs added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobList.map((job, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute top-4 right-4">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={22}
                    onClick={() => handleDelete(index)}
                    title="Delete Job"
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">{job.name}</h4>
                <p className="mb-1">
                  <span className="font-semibold">Degree:</span> {job.degree}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Skills:</span> {job.skills}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Perks:</span> {job.perks}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Description:</span> {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJob;
