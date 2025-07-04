import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 min-h-screen w-64 pt-10 bg-gray-100 border-r border-gray-300 flex flex-col dark:bg-black dark:border-gray-700">
      <ul className="mt-20 pt-15">
        <NavLink
          to="/admin/client-requests"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive
                ? 'bg-[#F2F3FF] border-r-4 border-blue-600 font-semibold text-black dark:text-black'
                : 'text-black dark:text-white'
            }`
          }
        >
          Client Requests
        </NavLink>
        <NavLink
          to="/admin/add-service"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive
                ? 'bg-[#F2F3FF] border-r-4 border-blue-600 font-semibold text-black dark:text-black'
                : 'text-black dark:text-white'
            }`
          }
        >
          Add Service
        </NavLink>
        <NavLink
          to="/admin/add-job"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive
                ? 'bg-[#F2F3FF] border-r-4 border-blue-600 font-semibold text-black dark:text-black'
                : 'text-black dark:text-white'
            }`
          }
        >
          Add Job
        </NavLink>
        <NavLink
          to="/admin/add-team-member"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive
                ? 'bg-[#ededf2] border-r-4 border-blue-600 font-semibold text-black dark:text-black'
                : 'text-black dark:text-white'
            }`
          }
        >
          Add Team Member
        </NavLink>
        <NavLink
          to="/admin/job-applications"
          className={({ isActive }) =>
            `block py-3.5 px-6 cursor-pointer ${
              isActive
                ? 'bg-[#F2F3FF] border-r-4 border-blue-600 font-semibold text-black dark:text-black'
                : 'text-black dark:text-white'
            }`
          }
        >
          Job Applications
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
