import Dashboard from "../components/Dashboard";
import localImage from "../assets/Tokyo.png";

const Home = ({ isLoggedIn }) => {
  return (
    <div className="flex h-screen pt-16 bg-gray-100">
      {/* Show sidebar only if user is logged in */}
      {isLoggedIn && <Dashboard />}  

      <div className={`flex-1 p-8 flex flex-col justify-start items-start ${isLoggedIn ? "pl-24" : "pl-8"}`}>
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-start gap-12 mt-[-30px]">
          {/* Left Side: Title and Paragraph */}
          <div className="flex-1 text-left pl-12">
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-wide uppercase mb-6">
              Task Manager
            </h1>
            <p className="text-lg text-gray-700 mt-2 leading-relaxed max-w-lg">
              Boost your productivity and stay on top of your tasks effortlessly.  
              Organize, prioritize, and achieve your goals with a seamless workflow.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 flex justify-center lg:justify-start pl-12">
            <img
              src={localImage}
              alt="Tokyo City Illustration"
              className="w-full max-w-xl rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
