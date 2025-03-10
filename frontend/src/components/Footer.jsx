export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-700 py-6 mt-10 w-full">
      <div className="container mx-auto flex flex-col justify-center items-center px-6">
        <p className="text-sm text-center">&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
        <div className="flex gap-4 mt-4 justify-center">
          <a href="#" className="hover:text-button transition">Privacy Policy</a>
          <a href="#" className="hover:text-button transition">Terms of Service</a>
          <a href="#" className="hover:text-button transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
