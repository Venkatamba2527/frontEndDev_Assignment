// src/components/Navbar.jsx
import { useState } from 'react';
import { Moon, Sun, Menu, X, Home, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home, current: location.pathname === '/' },
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Login', href: '/login', icon: LogIn, current: location.pathname === '/login' },
    { name: 'Register', href: '/signup', icon: UserPlus, current: location.pathname === '/signup' },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navigation.map((item) => {
                if (user && (item.name === 'Login' || item.name === 'Register')) return null;
                if (!user && item.name === 'Dashboard') return null;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </a>
                );
              })}

              {user && (
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  {user.name || user.username}
                </a>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              if (user && (item.name === 'Login' || item.name === 'Register')) return null;
              if (!user && item.name === 'Dashboard') return null;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              );
            })}

            {user && (
              <a
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                {user.name || user.username}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}