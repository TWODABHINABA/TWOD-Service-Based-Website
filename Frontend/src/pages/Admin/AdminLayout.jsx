import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';

// Import your admin page components here:
import AddJob from './AddJob';
import AddTeamMember from './AddTeamMember';
import JobApplications from './JobApplications';
import ClientRequests from './clientRequests';
import AddService from './AddService';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="ml-64 p-6 min-h-[calc(100vh-6rem)] bg-white dark:bg-gray-900">
        <Routes>
          <Route path="client-requests" element={<ClientRequests />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="add-team-member" element={<AddTeamMember />} />
          <Route path="job-applications" element={<JobApplications />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
