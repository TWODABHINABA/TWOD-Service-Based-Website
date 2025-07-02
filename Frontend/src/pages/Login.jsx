import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/user-management/api';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleGoogleLogin = () => {
    // window.location.href = 'https://twod-service-based-website-backend.onrender.com/auth/google';
    window.location.href = 'http://localhost:6001/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'https://twod-service-based-website-backend.onrender.com/auth/github';
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (image) formData.append('image', image);

      const res = await api.post('/api/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      localStorage.setItem('token', res.data.token);
      toast.success("Register successful");
      setState("Login");
    } catch (err) {
      const error = err.response?.data?.message || 'Signup failed';
      toast.error(error);
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
      toast.success("Login sucessfull")
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('dummyToken');
  //   if (token) {
  //     navigate('/');
  //   }
  // }, []);

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
        {state !== 'Sign Up' && !showForgot && (
          <div className="w-full text-right">
            <span
              className="text-blue-600 underline cursor-pointer text-sm"
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </span>
          </div>
        )}
        {state === 'Sign Up' && (
        <div className="w-full">
          <p>Profile Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              setImage(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="border border-zinc-500 rounded w-full p-2 mt-1"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded-full" />
          )}
        </div>
        )}

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

        {showForgot && (
          <div className="w-full flex flex-col gap-2">
            <p>Enter your email to reset password</p>
            <input
              type="email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              className="border border-zinc-500 rounded w-full p-2 mt-1"
              placeholder="Email"
            />
            <button
              type="button"
              className="bg-blue-600 text-white w-full rounded-md text-base py-2"
              onClick={async () => {
                try {
                  await api.post('/forgot-password', { email: forgotEmail });
                  toast.success('Password reset link sent to your email!');
                  setShowForgot(false);
                  setForgotEmail('');
                } catch (err) {
                  toast.error(err.response?.data?.message || 'Failed to send reset link');
                }
              }}
            >
              Send Reset Link
            </button>
            <button
              type="button"
              className="text-gray-500 underline text-sm mt-1"
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
