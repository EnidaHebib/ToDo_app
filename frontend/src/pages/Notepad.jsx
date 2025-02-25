import TaskBoard from "../components/TaskBoard";
import Dashboard from "../components/Dashboard";

const Notepad = () => {
  return (
    <div className="flex h-screen pt-16">
      <Dashboard /> {/* Sidebar */}
      
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Notepad</h1>
        <TaskBoard /> {/* TaskBoard now appears in Notepad */}
      </div>
    </div>
  );
};

export default Notepad;
