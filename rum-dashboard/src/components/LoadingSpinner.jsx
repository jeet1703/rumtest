import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ message = 'Loading RUM data...' }) => (
  <div className="flex flex-col items-center justify-center p-12">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

