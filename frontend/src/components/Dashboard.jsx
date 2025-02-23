import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddNewTask = () => {
    navigate("/add-task");
  };

  return (
    <div className="w-64 p-6 bg-gray-600 text-white h-screen fixed left-0 top-0 flex flex-col justify-start pt-16">
      <h1 className="text-xl font-semibold mb-6 text-center">Taskly Dashboard</h1>
      <button
        className="w-full py-3 bg-gray-300 text-black text-lg rounded-lg hover:bg-gray-400 transition"
        onClick={handleAddNewTask}
      >
        <span className="mr-2">+</span> Add New Task
      </button>
    </div>
  );
};

export default Dashboard;
