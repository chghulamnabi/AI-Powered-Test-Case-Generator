
import React, { useState } from 'react';
import { TestCase, TestCaseCategory } from '../types';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);


const TestCaseRow: React.FC<{ testCase: TestCase }> = ({ testCase }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(testCase.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-start py-3 px-2 rounded hover:bg-slate-700/50 transition-colors">
      <div className="col-span-2 text-sm font-mono text-slate-400">{testCase.id}</div>
      <div className="col-span-5 text-sm text-slate-200">{testCase.description}</div>
      <div className="col-span-4 text-sm text-slate-300">{testCase.expectedResult}</div>
      <div className="col-span-1 flex justify-end">
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-cyan-400 transition-colors"
          title="Copy description"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

interface TestCaseDisplayProps {
  categories: TestCaseCategory[];
}

const TestCaseDisplay: React.FC<TestCaseDisplayProps> = ({ categories }) => {
  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.category} className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 bg-slate-800 border-b border-slate-700">
            <h2 className="text-xl font-bold text-cyan-400">{category.category}</h2>
          </div>
          <div className="divide-y divide-slate-700/50 p-2 sm:p-4">
             <div className="grid grid-cols-12 gap-4 items-center pb-3 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <div className="col-span-2">Test ID</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-4">Expected Result</div>
                <div className="col-span-1"></div>
             </div>
            {category.testCases.map((tc) => (
              <TestCaseRow key={tc.id} testCase={tc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseDisplay;
