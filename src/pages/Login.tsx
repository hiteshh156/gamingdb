import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Gamepad2, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-yellow-500 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-black p-4 rounded-full">
                <Gamepad2 className="h-12 w-12 text-yellow-400" />
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            Welcome to XPEDIA
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </h2>
          <p className="mt-2 text-sm text-gray-300">Your Ultimate Gaming Hub</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-white/10 bg-black/50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-white/10 bg-black/50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-150 ease-in-out"
            >
              Sign in
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/signup" className="font-medium text-yellow-400 hover:text-yellow-500">
                New player? Create account
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/" className="font-medium text-yellow-400 hover:text-yellow-500">
                Skip for now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};