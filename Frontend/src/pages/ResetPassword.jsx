import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../components/user-management/api';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post(`/reset-password/${token}`, { password });
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="min-h-screen flex items-center justify-center pt-24 px-4">
      <div className="flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white bg-opacity-90">
        <p className="text-2xl font-semibold">Reset Password</p>
        <div className="w-full">
          <p>New Password</p>
          <input
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-zinc-500 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Confirm Password</p>
          <input
            required
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="border border-zinc-500 rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full rounded-md text-base py-2"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;