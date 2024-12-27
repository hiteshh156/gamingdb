import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Search, User } from './icons';
import { Logo } from './Logo';

export const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/search" className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="h-6 w-6" />
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-lg">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-black px-4 py-2 rounded-lg hover:bg-gray-800 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-black font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};