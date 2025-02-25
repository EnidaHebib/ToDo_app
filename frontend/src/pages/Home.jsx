import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <div className="flex h-screen pt-16">
      <Dashboard /> {/* Sidebar */}

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="text-lg">Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default Home;
