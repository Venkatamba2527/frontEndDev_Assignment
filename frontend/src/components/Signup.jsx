import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate('/dashboard');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input {...register('username')} placeholder="Username" className="w-full pl-12 pr-4 py-3 border rounded-lg" />
            {errors.username && <p className="text-error text-sm">{errors.username.message}</p>}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input {...register('email')} placeholder="Email" className="w-full pl-12 pr-4 py-3 border rounded-lg" />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input {...register('password')} type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 border rounded-lg" />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Have account? <a href="/login" className="text-primary font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}