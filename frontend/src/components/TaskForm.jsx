// src/components/TaskForm.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus } from 'lucide-react';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
});

export default function TaskForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex gap-3">
        <input
          {...register('title')}
          placeholder="Task title..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <input
          {...register('description')}
          placeholder="Description (optional)"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </form>
  );
}