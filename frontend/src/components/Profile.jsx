import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';
import { useEffect } from 'react';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  useEffect(() => reset(user), [user, reset]);

  const onSubmit = async (data) => {
    await updateProfile(data);
    alert('Profile updated!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <Edit2 className="w-5 h-5 text-gray-500" />
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <h3 className="mt-3 text-lg font-semibold">{user?.username}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-400" />
          <input {...register('username')} className="flex-1 p-2 border rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <input {...register('email')} className="flex-1 p-2 border rounded-lg" />
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
}