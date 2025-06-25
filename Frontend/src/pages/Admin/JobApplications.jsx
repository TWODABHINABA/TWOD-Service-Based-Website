import React, { useEffect, useState } from 'react';
import api from '../../components/user-management/api';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/jobApplications');
      setApplications(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.post(`/applications/${id}/status`, { status });
      alert(`Application status updated to ${status}`);
      fetchApplications(); // Refresh the list
    } catch (err) {
      alert('Failed to update status.');
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Job Applications</h2>

      {loading ? (
        <p className="text-gray-300 text-center">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-300 text-center">No applications yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{app.applicantId?.name || 'N/A'}</h3>
                  <p className="mb-1"><strong>Email:</strong> {app.applicantId?.email || 'N/A'}</p>
                  <p className="mb-1"><strong>Applied for:</strong> {app.jobId?.jobName || 'N/A'}</p>
                  <p className="mb-2">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        app.status === 'accepted'
                          ? 'text-green-400'
                          : app.status === 'rejected'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View Resume
                    </a>
                    {app.coverLetter && (
                      <a
                        href={app.coverLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Cover Letter
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleStatusChange(app._id, 'accepted')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplications;
