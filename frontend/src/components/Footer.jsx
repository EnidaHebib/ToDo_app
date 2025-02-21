export default function Footer() {
    return (
      <footer className="bg-primary text-gray-700 py-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-button transition">Privacy Policy</a>
            <a href="#" className="hover:text-button transition">Terms of Service</a>
            <a href="#" className="hover:text-button transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  