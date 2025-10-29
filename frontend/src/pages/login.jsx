import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';  // npm i react-router-dom

const schema = yup.object({
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(6).required(),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.msg);  // Better: use toast notifications
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">  {/* Tailwind classes */}
      <input {...register('email')} className="border p-2 w-full mb-2" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input type="password" {...register('password')} className="border p-2 w-full mb-2" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
  );
}