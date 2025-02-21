import TaskForm from "../components/TaskForm";

const Home = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-accent">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center mb-6 text-primary">Task Manager</h1>
                <TaskForm />
            </div>
        </div>
    );
};

export default Home;
