import { useNavigate } from "react-router-dom";
import taskPhoto from "../assets/taskphoto.png"; // Importing the image

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Create Task", path: "/add-task", icon: "➕" },
    { label: "Notes & Ideas", path: "/notepad", icon: "📝" },
    { label: "Reminders & Alerts", path: "/event-reminder", icon: "⏰" },
    { label: "Personal", path: "/personal", icon: "✨" },
  ];

  return (
    <div className="w-80 p-8 bg-gray-600 text-white h-screen fixed left-0 top-0 flex flex-col items-center rounded-xl">
      {/* Dashboard Title - Placed Lower */}
      <h1 className="mt-12 text-4xl font-bold tracking-wide text-white/90 drop-shadow-lg">
        Dashboard
      </h1>

      {/* Menu Items - Adjusted to be half cm down */}
      <div className="flex flex-col items-center gap-8 mt-11 mb-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center px-10 py-5 rounded-lg bg-white/10 backdrop-blur-md text-lg font-medium text-white shadow-xl transition-all duration-300 hover:bg-white/20 hover:scale-105 w-full text-center"
            onClick={() => navigate(item.path)}
          >
            <span className="mr-4 text-2xl">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      {/* Task Manager Illustration - Rounded and Adjusted */}
      <div className="mt-7"> {/* Adjusted margin slightly up */}
        <img
          src={taskPhoto} // Using the imported image
          alt="Task Manager Illustration"
          className="w-36 h-36 object-cover rounded-full shadow-lg mx-auto" // Added 'rounded-full' for circular shape
        />
      </div>
    </div>
  );
};

export default Dashboard;
