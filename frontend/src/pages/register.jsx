import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState(null);

  const clientValidate = () => {
    if (!form.name || !form.email || form.password.length < 6) {
      return "Name, valid email and password (min 6 chars) required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cv = clientValidate();
    if (cv) return setErrors(cv);
    try {
      const res = await API.post('/auth/register', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data || 'Registration failed';
      setErrors(msg);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      {errors && <div className="text-red-600 mb-2">{errors}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})}/>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
