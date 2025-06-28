import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi'; // Import delete icon
import api from '../../components/user-management/api';

const AddJob = () => {
  const [jobData, setJobData] = useState({
    jobName: '',
    description: '',
    skillsRequired: '',
    degree: '',
    perks: '',
    location: '',
    salary: ''
  });

  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);


  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const checkAdmin = async () => {
            try {
                const res = await api.get('/admin/me', {
                    headers: {  
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsAdmin(res.data.role === 'admin');
            } catch (error) {
                console.error('Failed to check admin status:', error);
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [token]);
useEffect(() => {
  if (token && isAdmin) {
    fetchJobs();
  }
}, [token, isAdmin]);

if (!token) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>You must be logged in to view this page.</div>;
    }

    if (!isAdmin) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>Only admin has access to this page.</div>;
    }

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs');
      setJobList(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Convert skillsRequired and perks to arrays if they are not already
      const payload = {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(',').map(s => s.trim()),
        perks: jobData.perks ? jobData.perks.split(',').map(s => s.trim()) : [],
      };
      await api.post('/admin/newJob', payload);
      alert('Job added successfully!');
      setJobData({
        jobName: '',
        description: '',
        skillsRequired: '',
        degree: '',
        perks: '',
        location: '',
        salary: ''
      });
      fetchJobs();
    } catch (err) {
      alert('Failed to add job.');
      console.error('Error adding job:', err);
    } finally {
      setLoading(false);
    }
  };

  // Note: No backend DELETE endpoint is defined, so just remove from UI for now
  const handleDelete = async (id, index) => {
    console.log(index);
    const updatedJobs = [...jobList];
    updatedJobs.splice(index, 1);
    setJobList(updatedJobs);
    console.log(updatedJobs);
    const res = await api.delete(`/admin/jobs/${id}`);
    console.log(res);

    
    // Optionally, implement backend delete if available
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
              name="jobName"
              value={jobData.jobName}
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
              name="skillsRequired"
              value={jobData.skillsRequired}
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

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Salary</label>
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5-8 LPA"
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
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Job'}
            </button>
          </div>
        </form>
      </div>

      {/* Job List */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Job Listings</h3>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : jobList.length === 0 ? (
          <p className="text-gray-300">No jobs added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobList.map((job, index) => (
              <div
                key={job._id || index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute top-4 right-4">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={22}
                    onClick={() => handleDelete(job._id, index)}
                    title="Delete Job"
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">{job.jobName}</h4>
                <p className="mb-1">
                  <span className="font-semibold">Degree:</span> {job.degree}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Skills:</span> {job.skillsRequired.join(', ')}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Perks:</span> {job.perks.join(', ')}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Location:</span> {job.location}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Salary:</span> {job.salary}
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
