'use client';

import { useState } from 'react';

interface ConversionResult {
  audioUrl?: string;
  script?: string;
  error?: string;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<ConversionResult>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsConverting(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      setResult({
        audioUrl: data.audioUrl,
        script: data.script
      });
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Conversion failed'
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full px-4 py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Podcast Converter
          </h1>
          <p className="mt-2 text-gray-600">
            Transform your text into engaging podcast discussions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="content" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your content here to convert into a podcast-style discussion..."
                    className="w-full min-h-[300px] p-4 text-gray-600 text-base md:text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    disabled={isConverting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isConverting || !content.trim()}
                  className="w-full py-3 px-6 text-base md:text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConverting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Converting...
                    </span>
                  ) : (
                    'Convert to Podcast'
                  )}
                </button>
              </form>
            </div>

            {/* Error Message */}
            {result.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{result.error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {(result.audioUrl || result.script) && (
            <div className="space-y-6">
              {/* Audio Player */}
              {result.audioUrl && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Generated Podcast
                  </h2>
                  <audio 
                    controls 
                    className="w-full"
                    src={result.audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Script Display */}
              {result.script && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Generated Script
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {result.script}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}