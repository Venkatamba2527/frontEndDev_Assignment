import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Edit2, Save, X, Shield, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContexts';
import { useEffect, useState } from 'react';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Valid email required').required('Email is required'),
});

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: yupResolver(schema),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || user.username || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    reset({
      name: user.name || user.username || '',
      email: user.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="dark-glass-effect rounded-2xl p-6 border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Profile Settings
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl transition-all duration-200 border border-blue-500/20 hover:border-blue-500/30"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty || isLoading}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-xl transition-all duration-200 border border-green-500/20 hover:border-green-500/30 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={cancelEdit}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-xl transition-all duration-200 border border-gray-500/20 hover:border-gray-500/30 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl mb-3">
          {(user?.name || user?.username)?.[0]?.toUpperCase() || 'U'}
        </div>
        <h3 className="text-lg font-semibold text-white text-center">
          {user?.name || user?.username}
        </h3>
        <p className="text-sm text-gray-400 text-center">{user?.email}</p>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            {...register('name')}
            disabled={!isEditing || isLoading}
            className="w-full px-4 py-3 dark-input rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-white placeholder-gray-500"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            disabled={!isEditing || isLoading}
            className="w-full px-4 py-3 dark-input rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-white placeholder-gray-500"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Additional Settings */}
        <div className="pt-4 border-t border-gray-700">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Bell className="w-4 h-4" />
            Notification Settings
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500" defaultChecked />
              Email notifications
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500" defaultChecked />
              Task reminders
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}