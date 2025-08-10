import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { Card } from '../../components/Card';
import { ScanLine, Mail, Lock, LogIn, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      // Store the token temporarily in localStorage so the axios interceptor can use it
      localStorage.setItem('token', response.access_token);
      // Now get user data with the token available
      const userData = await authService.getMe();
      // Call login with both token and user data
      login(response.access_token, userData);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      // Clean up token if there was an error
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-indigo-800 to-sky-700 py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <ScanLine className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-3 text-lg">Sign in to your ScanlyAI account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-lg"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-4 px-6 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg text-lg font-semibold"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-6 w-6" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </Card>
        </div>
    </div>
  );
}