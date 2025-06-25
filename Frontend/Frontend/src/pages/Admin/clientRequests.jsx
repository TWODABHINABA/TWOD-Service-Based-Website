import React, { useState, useEffect } from 'react';
import api from '../../components/user-management/api';

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/requests');
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);
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
      fetchRequests();
    }
  }, [token, isAdmin]);

    if (!token) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>You must be logged in to view this page.</div>;
    }

    if (!isAdmin) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>Only admin has access to this page.</div>;
    }

 

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.post(`/admin/requests/${id}/${status}`);
      alert(`Request has been ${status}.`);
      fetchRequests(); // Refresh the list
    } catch (err) {
      alert(`Failed to ${status} request.`);
      console.error(`Error updating request status:`, err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Client Service Requests</h2>

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
                  <p className="mb-1"><strong>Status:</strong> <span className={`font-semibold ${request.status === 'accepted' ? 'text-green-400' : 'text-yellow-400'}`}>{request.status}</span></p>
                  <p className="mt-2"><strong>Message:</strong></p>
                  <p className="text-gray-300">{request.message}</p>
                </div>
                {request.status !== 'accepted' && (
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
