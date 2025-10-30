import { useState } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="/dashboard" className="text-sm font-medium">Dashboard</a>
            <a href="/login" className="text-sm font-medium">Login</a>
            <a href="/signup" className="text-sm font-medium">Register</a>
          </div>
        </div>
      </div>
    </nav>
  );
}