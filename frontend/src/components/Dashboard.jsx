import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Add New Task", path: "/add-task", icon: "➕" },
    { label: "Calendar View", path: "/calendar", icon: "📅" },
    { label: "Notepad", path: "/notepad", icon: "📝" },
    { label: "Event Reminder", path: "/event-reminder", icon: "⏰" },
    { label: "Personal", path: "/personal", icon: "✨" },
  ];

  return (
    <div className="w-64 p-6 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col items-center">
      {/* Dashboard Title - Placed Lower */}
      <h1 className="mt-12 text-3xl font-bold tracking-wide text-white/90 drop-shadow-lg">
        Dashboard
      </h1>

      {/* Menu Items - Perfectly Centered */}
      <div className="flex flex-col items-center gap-6 mt-auto mb-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
            onClick={() => navigate(item.path)}
          >
            <span className="mr-3 text-xl">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
