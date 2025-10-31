// src/components/Login.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('Valid email required').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                {...register('email')}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}