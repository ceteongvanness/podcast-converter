'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsConverting(true);
    try {
      // Your conversion logic here
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="w-[800px] flex flex-col items-center gap-6 p-4">
        <form 
          onSubmit={handleSubmit} 
          className="w-full flex flex-col items-center gap-6"
          suppressHydrationWarning={true}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="TextArea"
            className="w-full h-[400px] rounded-[40px] border-2 border-green-500 p-6 resize-none focus:outline-none"
            disabled={isConverting}
          />
          <button
            type="submit"
            disabled={isConverting}
            className="w-[600px] h-[60px] rounded-[40px] border-2 border-green-500 hover:bg-green-50 transition-colors"
          >
            {isConverting ? 'Converting...' : 'Convert to Podcast'}
          </button>
        </form>
      </div>
    </main>
  );
}