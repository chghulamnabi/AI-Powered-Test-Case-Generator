
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
       <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-400 border-t-transparent"></div>
        <div className="absolute h-12 w-12 animate-spin-slow rounded-full border-4 border-solid border-blue-500 border-t-transparent border-l-transparent"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <p className="text-slate-400 font-medium text-lg">Generating Test Cases...</p>
    </div>
  );
};

export default Loader;
