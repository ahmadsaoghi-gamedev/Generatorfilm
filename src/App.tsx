import React, { useState } from 'react';
import { Film, AlertCircle, CheckCircle } from 'lucide-react';
import { StoryForm } from './components/StoryForm';
import { StoryResults } from './components/StoryResults';
import { generateStory } from './services/apiService';
import { FormData, StoryResult } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const storyResult = await generateStory(formData);
      setResult(storyResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="text-orange-400" size={40} />
            <h1 className="text-4xl font-bold text-white">
              Film Story Generator
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Generate professional film stories optimized for Veo3 with intelligent scene breakdown and 3-act structure
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-red-400 font-medium">Generation Failed</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Display */}
        {result && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-400 font-medium">Story Generated Successfully!</p>
              <p className="text-green-300 text-sm">Your film story is ready for production</p>
            </div>
            <button
              onClick={resetForm}
              className="ml-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
            >
              Generate New Story
            </button>
          </div>
        )}

        {/* Main Content */}
        {!result ? (
          <StoryForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <StoryResults result={result} />
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>
            Powered by AI • Optimized for Veo3 • Professional Film Production
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;