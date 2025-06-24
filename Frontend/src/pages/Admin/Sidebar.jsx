import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-transparent border-r w-full sm:w-64 flex  pt-24 flex-col ">
      <ul className="text-white mt-5">

        <NavLink
          to="/add-job"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-primary font-semibold' : ''
            }`
          }
        >
          Add Job
        </NavLink>

        <NavLink
          to="/add-team-member"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#ededf2] border-r-4 border-primary font-semibold' : ''
            }`
          }
        >
          Add Team Member
        </NavLink>

        <NavLink
          to="/job-applications"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-primary font-semibold' : ''
            }`
          }
        >
          Job Applications
        </NavLink>

        <NavLink
          to="/team-member-list"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-primary font-semibold' : ''
            }`
          }
        >
          Team Member List
        </NavLink>

      </ul>
    </div>
  );
};

export default Sidebar;
