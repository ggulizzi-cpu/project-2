import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingResults() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600">Finding relevant information...</p>
    </div>
  );
}