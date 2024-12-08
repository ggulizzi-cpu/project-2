import React from 'react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="group">
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       bg-clip-text text-transparent 
                       group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 
                       transition-all duration-300">
          onjourney
        </span>
      </h1>
    </Link>
  );
}