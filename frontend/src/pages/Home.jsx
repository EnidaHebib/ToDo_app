import TaskBoard from "../components/TaskBoard"; // Import TaskBoard
import Dashboard from "../components/Dashboard"; // Import Dashboard

const Home = () => {
  return (
    <div className="flex h-screen pt-16"> {/* Add padding-top to avoid overlap with fixed navbar */}
      <Dashboard /> {/* Sidebar */}
      
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <TaskBoard /> {/* Task Board */}
      </div>
    </div>
  );
};

export default Home;
