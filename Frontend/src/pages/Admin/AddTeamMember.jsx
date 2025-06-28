import React, { useState, useEffect } from 'react';
import api from '../../components/user-management/api';

const AddTeamMember = () => {
  const [memberData, setMemberData] = useState({
    name: '',
    image: '',
    skill: '',
    available: false,
    linkedinId: '',
  });

  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      fetchTeam();
    }
  }, [token, isAdmin]);

    if (!token) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>You must be logged in to view this page.</div>;
    }

    if (!isAdmin) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>Only admin has access to this page.</div>;
    }

  // Fetch team members from backend
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team');
      setTeamList(res.data);
    } catch (err) {
      console.error('Failed to fetch team:', err);
    } finally {
      setLoading(false);
    }
  };

 

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setMemberData({
      ...memberData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', memberData.name);
      formData.append('skill', memberData.skill);
      formData.append('available', memberData.available);
      formData.append('linkedinId', memberData.linkedinId);
      
      if (memberData.image) {
        formData.append('image', memberData.image);
      }

      await api.post('/admin/newTeamMember', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      alert('Team member added!');
      setMemberData({ name: '', image: '', skill: '', available: false, linkedinId: '' });
      fetchTeam(); // Refresh the team list
    } catch (err) {
      alert('Failed to add team member.');
      console.error('Error adding team member:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete team member from backend
  const handleDelete = async (memberId) => {
    try {
      await api.delete(`/admin/team/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchTeam(); // Refresh the team list
      alert('Team member deleted successfully!');
    } catch (err) {
      alert('Failed to delete team member.');
      console.error('Error deleting team member:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white pt-24 mt-10">
      <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-6">Add Team Member</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={memberData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              accept="image/*"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Skill</label>
            <input
              type="text"
              name="skill"
              value={memberData.skill}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={memberData.available}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label className="font-medium">Available</label>
          </div>

          <div>
            <label className="block mb-1 font-medium">LinkedIn ID</label>
            <input
              type="text"
              name="linkedinId"
              value={memberData.linkedinId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              placeholder="linkedin-username"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>

      {/* List of Team Members */}
      <div className="bg-white/10 backdrop-blur rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Team Members</h3>
        {teamList.length === 0 ? (
          <p className="text-gray-300">No team members added yet.</p>
        ) : (
          <ul className="space-y-6">
            {teamList.map((member) => (
              <li key={member._id} className="flex items-start gap-4 border border-white/20 p-4 rounded">
                <img
                  src={member.image.url}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full border"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{member.name}</h4>
                  <p><strong>Skill:</strong> {member.skill}</p>
                  <p><strong>Available:</strong> {member.available ? 'Yes' : 'No'}</p>
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={`${member.linkedinId}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      View Profile
                    </a>
                  </p>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddTeamMember;
