import React, { useEffect, useState } from 'react';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('jobApplications')) || [];
    setApplications(storedApps);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Job Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-300 text-center">No applications yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{app.name}</h3>
              <p className="mb-1"><strong>Applied Role:</strong> {app.role}</p>
              <a
                href={app.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplications;
