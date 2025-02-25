import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Task Manager", path: "/add-task", icon: "➕" },
    { label: "Calendar & Events", path: "/calendar", icon: "📅" },
    { label: "Notes & Ideas", path: "/notepad", icon: "📝" },
    { label: "Reminders & Alerts", path: "/event-reminder", icon: "⏰" },
    { label: "Personal", path: "/personal", icon: "✨" },
  ];

  return (
    <div className="w-80 p-8 bg-gray-700 text-white h-screen fixed left-0 top-0 flex flex-col items-center rounded-xl">
      {/* Dashboard Title - Placed Lower */}
      <h1 className="mt-16 text-4xl font-bold tracking-wide text-white/90 drop-shadow-lg">
        Dashboard
      </h1>

      {/* Menu Items - Perfectly Centered */}
      <div className="flex flex-col items-center gap-8 mt-auto mb-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center px-10 py-5 rounded-lg bg-white/10 backdrop-blur-md text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
            onClick={() => navigate(item.path)}
          >
            <span className="mr-4 text-2xl">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
