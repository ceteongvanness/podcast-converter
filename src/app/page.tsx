'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textarea';

interface ConversionStatus {
  status: 'idle' | 'converting' | 'done' | 'error';
  audioUrl?: string;
  error?: string;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ConversionStatus>({ status: 'idle' });

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setStatus({ status: 'converting' });
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) throw new Error('Conversion failed');
      
      const data = await response.json();
      setStatus({ status: 'done', audioUrl: data.audioUrl });
    } catch (error) {
      setStatus({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Text to Podcast Converter
        </h1>

        <form onSubmit={handleConvert} className="space-y-4">
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your content here..."
            disabled={status.status === 'converting'}
          />
          
          <Button
            type="submit"
            disabled={status.status === 'converting' || !content.trim()}
            className="w-full"
          >
            {status.status === 'converting' ? 'Converting...' : 'Convert to Podcast'}
          </Button>
        </form>

        {status.error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {status.error}
          </div>
        )}

        {status.audioUrl && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={status.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </main>
  );
}