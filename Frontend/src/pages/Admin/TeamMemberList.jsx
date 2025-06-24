import React, { useEffect, useState } from 'react';

const TeamMemberList = () => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const storedTeam = JSON.parse(localStorage.getItem('teamList')) || [];
    setTeamList(storedTeam);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Team Members</h2>

      {teamList.length === 0 ? (
        <p className="text-gray-300 text-center">No team members added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamList.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md flex gap-6"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/30"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p><strong>Speciality:</strong> {member.speciality}</p>
                  <p><strong>Joining Date:</strong> {member.joiningDate}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mt-2"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberList;
