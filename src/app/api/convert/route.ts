import { NextResponse } from 'next/server';
import type AWS from 'aws-sdk';

let polly: AWS.Polly | null = null;

// Initialize Polly only when needed
async function getPolly() {
  if (!polly) {
    const AWS = (await import('aws-sdk')).default;
    polly = new AWS.Polly({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy',
      },
    });
  }
  return polly;
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Only initialize Polly when actually making a request
    const pollyService = await getPolly();

    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna',
      Engine: 'neural',
    };

    try {
      const response = await pollyService.synthesizeSpeech(params).promise();
      
      if (!response.AudioStream) {
        throw new Error('No audio stream returned');
      }

      const audioBuffer = Buffer.from(response.AudioStream as Buffer);
      const base64Audio = audioBuffer.toString('base64');
      const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

      return NextResponse.json({ audioUrl });
    } catch (error) {
      console.error('AWS Polly error:', error);
      return NextResponse.json(
        { error: 'Text-to-speech conversion failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Add a simple GET handler
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}