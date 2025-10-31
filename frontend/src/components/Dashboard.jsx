import React from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Profile from './Profile';
import TaskList from './TaskList';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen dark-enhanced-bg-gradient">
    
      <header className="dark-glass-effect border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-white/5">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name || user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                  {(user?.name || user?.username)?.[0]?.toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 border border-transparent hover:border-white/5"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            <Profile />

      
            <div className="dark-glass-effect rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Today's Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-xl border border-blue-500/20">
                  <span className="text-sm text-gray-400">Total Tasks</span>
                  <span className="text-lg font-bold text-blue-400">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-900/20 rounded-xl border border-green-500/20">
                  <span className="text-sm text-gray-400">Completed</span>
                  <span className="text-lg font-bold text-green-400">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-900/20 rounded-xl border border-orange-500/20">
                  <span className="text-sm text-gray-400">Pending</span>
                  <span className="text-lg font-bold text-orange-400">4</span>
                </div>
              </div>
            </div>

            <div className="dark-glass-effect rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Productivity Tip
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Break large tasks into smaller, manageable steps. Complete the most important tasks first thing in the morning.
              </p>
            </div>
          </div>

  
          <div className="lg:col-span-3">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}
