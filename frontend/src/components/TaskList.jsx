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
  Loader2,
  ListTodo,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tasks');
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setOperationLoading('adding');
    try {
      const res = await axios.post('/api/tasks', taskData);
      setTasks([...tasks, res.data.task]);
    } catch (err) {
      alert('Failed to add task');
    } finally {
      setOperationLoading(null);
    }
  };

  const updateTask = async (id, updatedTask) => {
    setOperationLoading(`updating-${id}`);
    try {
      const res = await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === id ? res.data.task : t)));
    } catch (err) {
      alert('Failed to update task');
    } finally {
      setOperationLoading(null);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setOperationLoading(`deleting-${id}`);
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete task');
    } finally {
      setOperationLoading(null);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  ).filter(task => {
    if (filter === 'completed') return task.completed || task.status === 'done';
    if (filter === 'pending') return !task.completed && task.status !== 'done';
    return true;
  });

  const completedTasks = tasks.filter(task => task.completed || task.status === 'done').length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <div className="glass-effect dark:dark-glass-effect rounded-2xl p-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Loading your tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect dark:dark-glass-effect rounded-2xl p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-blue-500" />
            My Tasks
            <span className="text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full ml-2">
              {totalTasks} tasks
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            {completedTasks} of {totalTasks} tasks completed
            {completedTasks === totalTasks && totalTasks > 0 && (
              <span className="text-green-500 ml-1">🎉 All done!</span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2.5 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 rounded-xl text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Add Task Form */}
      <TaskForm onSubmit={addTask} isLoading={operationLoading === 'adding'} />

      {/* Task List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {search || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {search || filter !== 'all'
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'Get started by creating your first task above!'
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isUpdating = operationLoading === `updating-${task._id}`;
            const isDeleting = operationLoading === `deleting-${task._id}`;
            const isCompleted = task.completed || task.status === 'done';

            return (
              <div
                key={task._id}
                className={`group flex items-center justify-between p-4 glass-effect dark:dark-glass-effect rounded-xl task-card-hover ${
                  (isUpdating || isDeleting) ? 'opacity-50' : ''
                } ${isCompleted ? 'task-completed' : 'task-pending'}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => updateTask(task._id, {
                      completed: !isCompleted,
                      status: !isCompleted ? 'done' : 'todo'
                    })}
                    disabled={isUpdating || isDeleting}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white shadow-lg'
                        : 'border-gray-300 dark:border-gray-500 hover:border-green-500 hover:shadow-md'
                    } disabled:opacity-50`}
                  >
                    {isUpdating ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : null}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${
                      isCompleted
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' :
                        task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' :
                        'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                      }`}>
                        {task.priority || 'medium'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'done' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' :
                        task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                        'bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20'
                      }`}>
                        {task.status || 'todo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => {
                      const newTitle = prompt('Edit task title:', task.title);
                      const newDesc = prompt('Edit task description:', task.description);
                      if (newTitle !== null) {
                        updateTask(task._id, {
                          title: newTitle,
                          description: newDesc
                        });
                      }
                    }}
                    disabled={isUpdating || isDeleting}
                    className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    disabled={isUpdating || isDeleting}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}