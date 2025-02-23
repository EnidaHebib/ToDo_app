import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddNewTask = () => {
    // Navigate to the Add Task page
    navigate("/add-task");
  };

  return (
    <div className="w-1/4 p-6 bg-gray-800 text-white h-screen">
      <h1 className="text-3xl font-semibold mb-4">Taskly Dashboard</h1>
      {/* Button: Light gray background, dark text, centered */}
      <button
        className="w-full py-2 bg-gray-300 text-black text-lg rounded-lg hover:bg-gray-400 transition-colors"
        onClick={handleAddNewTask}
      >
        <span className="mr-2">+</span> Add New Task
      </button>
    </div>
  );
};

export default Dashboard;
