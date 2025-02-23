import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm"; // Import TaskForm
import UpdateTask from "./components/UpdateTask";
import Footer from "./components/Footer"; // Import Footer
import "./App.css";

function App() {
  const isLoggedIn = false;
  const userName = "Mike";

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} userName={userName} />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-center mb-6"></h1>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Render Home here */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<TaskForm />} /> {/* Route for TaskForm */}
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
