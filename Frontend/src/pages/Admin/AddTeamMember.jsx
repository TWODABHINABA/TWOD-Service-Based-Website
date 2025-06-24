import React, { useState, useEffect } from 'react';

const AddTeamMember = () => {
  const [memberData, setMemberData] = useState({
    name: '',
    image: '',
    speciality: '',
    joiningDate: '',
    linkedin: '',
  });

  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('teamList')) || [];
    setTeamList(stored);
  }, []);

  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...teamList, memberData];
    setTeamList(updatedList);
    localStorage.setItem('teamList', JSON.stringify(updatedList));
    alert('Team member added!');
    setMemberData({ name: '', image: '', speciality: '', joiningDate: '', linkedin: '' });
  };

  const handleDelete = (index) => {
    const updated = [...teamList];
    updated.splice(index, 1);
    setTeamList(updated);
    localStorage.setItem('teamList', JSON.stringify(updated));
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
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={memberData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={memberData.speciality}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={memberData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">LinkedIn ID</label>
            <input
              type="url"
              name="linkedin"
              value={memberData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 outline-none"
              placeholder="https://linkedin.com/in/username"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Add Member
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
            {teamList.map((member, index) => (
              <li key={index} className="flex items-start gap-4 border border-white/20 p-4 rounded">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full border"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{member.name}</h4>
                  <p><strong>Speciality:</strong> {member.speciality}</p>
                  <p><strong>Joining Date:</strong> {member.joiningDate}</p>
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      View Profile
                    </a>
                  </p>
                  <button
                    onClick={() => handleDelete(index)}
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
