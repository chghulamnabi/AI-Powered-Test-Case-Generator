
import React, { useState, useCallback } from 'react';
import { TestCaseCategory } from './types';
import { generateTestCases } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlInputForm from './components/UrlInputForm';
import TestCaseDisplay from './components/TestCaseDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.dubicars.com/');
  const [testCaseCategories, setTestCaseCategories] = useState<TestCaseCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeClick = useCallback(async () => {
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTestCaseCategories([]);

    try {
      const results = await generateTestCases(url);
      setTestCaseCategories(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            AI-Powered QA Test Case Generator
          </h1>
          <p className="text-lg text-slate-400">
            Enter a homepage URL to automatically generate a comprehensive suite of test cases.
          </p>
        </div>

        <UrlInputForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleAnalyzeClick}
          isLoading={isLoading}
        />

        <div className="mt-12">
          {isLoading && <Loader />}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!isLoading && testCaseCategories.length > 0 && (
            <TestCaseDisplay categories={testCaseCategories} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
