// src/components/TaskList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import {
  Search,
  Filter,
  CheckCircle,
  Circle,
  Trash2,
  Edit2,
  Plus,
} from 'lucide-react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await axios.post('/api/tasks', task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  // Search + Filter Logic
  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative">
      {/* Header: Title + Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm w-full sm:w-48 focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Add Task Form */}
      <TaskForm onSubmit={addTask} />

      {/* Task List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {search || filter !== 'all' ? 'No tasks match your filter.' : 'No tasks yet. Create one!'}
          </p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
            >
              {/* Task Info */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateTask(task._id, { completed: !task.completed })}
                  className="text-primary hover:scale-110 transition"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div>
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="text-warning hover:scale-110 transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-error hover:scale-110 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating + Button */}
      <button
        onClick={() => document.getElementById('task-title')?.focus()}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-200 z-50"
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}