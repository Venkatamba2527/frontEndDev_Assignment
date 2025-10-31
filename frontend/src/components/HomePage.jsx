
import React from 'react';
import { CheckCircle, Rocket, Users, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">

      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/20"></div>

       
        <nav className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
           
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>

            
              <div className="flex items-center gap-4">
                <a
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>

    
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
          
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-full px-4 py-2 mb-8">
              <Rocket className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Streamline Your Productivity
              </span>
            </div>

       
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Organize Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Work & Life
              </span>
            </h1>

        
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A modern task management application designed to help you focus on what matters most.
              <span className="block text-lg text-gray-500 dark:text-gray-400 mt-2">
                Beautiful, intuitive, and powerful - everything you need to boost your productivity.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="/signup"
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/login"
                className="group flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                Sign In to Dashboard
              </a>
            </div>

       
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">99%</div>
                <div className="text-gray-600 dark:text-gray-400">Task Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2.5x</div>
                <div className="text-gray-600 dark:text-gray-400">Productivity Boost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Cloud Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TaskFlow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with modern technology and user experience at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Intuitive Interface</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clean, modern design that makes task management a pleasure. Focus on your work without distractions.
              </p>
            </div>

           
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with enterprise-grade security. Automatic backups and real-time sync.
              </p>
            </div>

     
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Team Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect for individuals and teams. Collaborate seamlessly with shared projects and tasks.
              </p>
            </div>
          </div>
        </div>
      </div>


      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">TaskFlow</h2>
          </div>
          <p className="text-gray-400 mb-8">
            Modern task management for modern teams and individuals
          </p>
          <div className="flex justify-center gap-6">
            <a href="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</a>
            <a href="/signup" className="text-gray-400 hover:text-white transition-colors">Get Started</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            © 2024 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
