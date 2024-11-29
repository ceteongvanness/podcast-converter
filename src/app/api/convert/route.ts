import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Move AWS configuration inside the POST handler
export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Initialize AWS only when the API is called
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'AWS credentials not configured' },
        { status: 500 }
      );
    }

    const polly = new AWS.Polly({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna',
      Engine: 'neural',
    };

    try {
      console.log('Converting text to speech...');
      const response = await polly.synthesizeSpeech(params).promise();
      
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