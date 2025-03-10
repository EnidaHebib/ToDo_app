import React from 'react';
import { useLocation } from 'react-router-dom';
import TaskBoard from "../components/TaskBoard";
import Dashboard from "../components/Dashboard";

const Notepad = () => {
  const location = useLocation();

  // Check if the current path is '/notepad' to hide the Dashboard
  const isNotepadPage = location.pathname === "/notepad";

  return (
    <div className={`flex h-screen ${isNotepadPage ? 'pt-16' : ''}`}>
      {!isNotepadPage && <Dashboard />} {/* Render Dashboard only if it's not the Notepad page */}

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4"></h1>
        <TaskBoard /> {/* TaskBoard now appears in Notepad */}
      </div>
    </div>
  );
};

export default Notepad;
