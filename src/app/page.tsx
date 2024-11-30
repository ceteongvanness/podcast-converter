'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface ConversionStatus {
  status: 'idle' | 'converting' | 'done' | 'error';
  audioUrl?: string | null;
  script?: string | null;
  error?: string | null;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ConversionStatus>({
    status: 'idle'
  });

  const handleConvert = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setStatus({ 
        status: 'done', 
        audioUrl: data.audioUrl, 
        script: data.script 
      });
    } catch (err) {
      setStatus({ 
        status: 'error', 
        error: err instanceof Error ? err.message : 'Conversion failed' 
      });
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start p-8">
      <Card className="w-full max-w-[1440px] p-8 mt-8">
        <form onSubmit={handleConvert} className="w-full flex flex-col items-center gap-6">
          <div className="w-full max-w-[1200px]">
            <Textarea
              placeholder="Paste your content here to convert into a podcast-style discussion..."
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              className="min-h-[300px] w-full text-lg p-4"
              disabled={status.status === 'converting'}
            />
          </div>
          <Button
            type="submit"
            disabled={status.status === 'converting' || !content.trim()}
            className="w-64 h-12 text-lg"
          >
            {status.status === 'converting' ? 'Converting...' : 'Convert to Podcast'}
          </Button>
        </form>

        {status.error && (
          <div className="mt-8 w-full max-w-[1200px] mx-auto bg-red-50 text-red-700 p-4 rounded">
            {status.error}
          </div>
        )}

        {status.script && (
          <div className="mt-8 w-full max-w-[1200px] mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Discussion Script</h3>
              <div className="whitespace-pre-wrap">{status.script}</div>
            </Card>
          </div>
        )}

        {status.audioUrl && (
          <div className="mt-8 w-full max-w-[1200px] mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Generated Podcast</h3>
              <audio controls className="w-full">
                <source src={status.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}