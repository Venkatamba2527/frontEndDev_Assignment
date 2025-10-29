import { useState, useEffect } from 'react';
import { getProfile } from '../services/auth';
import { getTasks, createTask } from '../services/tasks';  // etc.
import { useForm } from 'react-hook-form';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    getProfile().then(res => setProfile(res.data));
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks(search, filterCompleted);
    setTasks(res.data);
  };

  const onSubmitTask = async (data) => {
    await createTask(data);
    fetchTasks();  // Refresh list
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Welcome, {profile?.profile.name}!</h1>

      {/* Profile Display/Update Form */}
      <div className="mb-4 p-4 border">
        <p>Email: {profile?.email}</p>
        {/* Add update form here, similar to login */}
      </div>

      {/* Search/Filter */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => { setSearch(e.target.value); fetchTasks(); }}
          className="border p-2 flex-1"
        />
        <label>
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={(e) => { setFilterCompleted(e.target.checked); fetchTasks(); }}
          />
          Completed only
        </label>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit(onSubmitTask)} className="mb-4">
        <input {...register('title', { required: true })} placeholder="Title" className="border p-2 mr-2" />
        <input {...register('description')} placeholder="Description" className="border p-2 mr-2" />
        <button type="submit" className="bg-green-500 text-white p-2">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <h3 className={task.completed ? 'line-through' : ''}>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => updateTask(task._id, { completed: !task.completed })} className="bg-blue-500 text-white p-1 mr-2">
                Toggle
              </button>
              <button onClick={() => { deleteTask(task._id); fetchTasks(); }} className="bg-red-500 text-white p-1">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={logout} className="bg-red-500 text-white p-2 mt-4">Logout</button>
    </div>
  );
}