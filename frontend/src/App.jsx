import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexts';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home route - simple welcome page */}
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center p-4">
              <div className="text-center dark-glass-effect rounded-3xl p-8 max-w-md w-full mx-auto border border-white/5">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl mx-auto mb-6">
                  ✓
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Welcome to TaskFlow
                </h1>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  A modern task management application to organize your work and boost productivity with beautiful design.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/login"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Get Started
                  </a>
                  <a
                    href="/signup"
                    className="border border-gray-600 text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-800/50 transition-all duration-200 hover:border-gray-500"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          } />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}