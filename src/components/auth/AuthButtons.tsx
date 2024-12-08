import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function AuthButtons() {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <UserCircle className="h-6 w-6 text-gray-600" />
          <span className="text-gray-700">{user.email}</span>
        </div>
        <button
          onClick={signOut}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 
                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2"
      >
        Sign Up
      </Link>
    </div>
  );
}