import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Loader2, Target } from 'lucide-react';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

export default function TaskForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-8 p-6 glass-effect dark:dark-glass-effect rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Task</h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Task Title *
          </label>
          <input
            {...register('title')}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <input
            {...register('description')}
            placeholder="Add some details (optional)"
            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transform hover:scale-105"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {isLoading ? 'Adding Task...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}