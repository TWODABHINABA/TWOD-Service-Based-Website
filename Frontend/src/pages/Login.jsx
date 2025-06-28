import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/user-management/api';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:6001/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:6001/auth/github';
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post('/api/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post('/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('dummyToken');
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <form className="min-h-screen flex items-center justify-center pt-24 px-4">
      <div className="flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white bg-opacity-90">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book Appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-zinc-500 rounded w-full p-2 mt-1"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-500 rounded w-full p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-zinc-500 rounded w-full p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white  w-full rounded-md text-base py-2"
          onClick={state === 'Sign Up' ? handleSignUp : handleLogin}
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <button
          type="button"
          className="bg-black text-white w-full rounded-md text-base py-2"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <button
          type="button"
          className="bg-black text-white w-full rounded-md text-base py-2"
          onClick={handleGithubLogin}
        >
          Login with Github
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new Account{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-600 underline cursor-pointer"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
