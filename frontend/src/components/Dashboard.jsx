import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Search, Filter } from 'lucide-react';
import Profile from './Profile';
import TaskList from './TaskList';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hi, {user?.username}
              </span>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="bg-error text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-md transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="lg:col-span-1">
            <Profile />
          </div>

          {/* Tasks */}
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}