import React, { useState, useEffect } from 'react';

const mockProjectsCount = 25;
const mockTeamMembersCount = 8;

const mockRequests = [
  {
    _id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'pending',
    message: 'I would like to inquire about a new project.',
  },
  {
    _id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'accepted',
    message: 'Please update me on the project timeline.',
  },
  {
    _id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    status: 'rejected',
    message: 'Requesting cancellation of previous order.',
  },
  {
    _id: '4',
    name: 'David Green',
    email: 'david@example.com',
    status: 'pending',
    message: 'Looking for a quote on your services.',
  },
];

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data (with a small delay)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 800);
  }, []);

  // Calculate stats from mock data
  const totalProjects = mockProjectsCount;
  const totalTeamMembers = mockTeamMembersCount;
  const currentRequestsCount = requests.filter(r => r.status === 'pending').length;
  const pastRequestsCount = requests.filter(r => r.status === 'accepted' || r.status === 'rejected').length;

  const handleStatusUpdate = (id, status) => {
    alert(`Pretend to ${status} request with id: ${id}`);
    // For frontend-only demo, just update local state:
    setRequests(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status: status === 'accept' ? 'accepted' : 'rejected' } : r
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white font-sans">
      <h2 className="text-3xl font-bold mb-8 text-center">Client Service Requests</h2>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-semibold">{totalProjects}</h3>
          <p>Total Projects</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-semibold">{totalTeamMembers}</h3>
          <p>Total Team Members</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-semibold">{currentRequestsCount}</h3>
          <p>Current Client Requests</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-semibold">{pastRequestsCount}</h3>
          <p>Past Client Requests</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-300">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-300">No client requests found.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{request.name}</h3>
                  <p className="mb-1"><strong>Email:</strong> {request.email}</p>
                  <p className="mb-1">
                    <strong>Status:</strong>{' '}
                    <span className={`font-semibold ${request.status === 'accepted' ? 'text-green-400' : request.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {request.status}
                    </span>
                  </p>
                  <p className="mt-2"><strong>Message:</strong></p>
                  <p className="text-gray-300">{request.message}</p>
                </div>
                {request.status === 'pending' && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleStatusUpdate(request._id, 'accept')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(request._id, 'reject')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientRequests;
