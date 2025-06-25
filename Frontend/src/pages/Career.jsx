import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import api from "../components/user-management/api";
import { useNavigate } from "react-router-dom";

const CareerPage = ({ user }) => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    resumeUrl: '',
    coverLetterUrl: '',
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    if (!user) {
      alert("Please log in to apply for a job.");
      navigate('/login');
      return;
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob || !user) return;

    try {
      await api.post('/applications/new', {
        jobId: selectedJob._id,
        applicantId: user._id,
        resumeUrl: applicationData.resumeUrl,
        coverLetter: applicationData.coverLetterUrl,
      });
      alert('Application submitted successfully!');
      setIsModalOpen(false);
      setApplicationData({ resumeUrl: '', coverLetterUrl: '' });
    } catch (err) {
      alert('Failed to submit application.');
      console.error('Error submitting application:', err);
    }
  };

  return (
    <div className="mt-20 min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Career Opportunities</h1>

        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition relative group border border-white/20"
              >
                <div className="flex items-center gap-3 text-secondary mb-3">
                  <FaBriefcase size={20} />
                  <h3 className="text-xl font-semibold">{job.jobName}</h3>
                </div>
                <div className="flex items-center text-sm text-gray-300 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.skillsRequired) && job.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-1"><span className="font-semibold">Degree:</span> {job.degree}</p>
                <p className="text-sm text-gray-300 mb-4"><span className="font-semibold">Salary:</span> {job.salary}</p>

                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-4 bg-blue-600 w-full py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg text-white border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.jobName}</h2>
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <input
                type="url"
                name="resumeUrl"
                placeholder="Resume URL"
                value={applicationData.resumeUrl}
                onChange={handleModalChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30"
                required
              />
              <input
                type="url"
                name="coverLetterUrl"
                placeholder="Cover Letter URL (Optional)"
                value={applicationData.coverLetterUrl}
                onChange={handleModalChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30"
              />
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPage;
