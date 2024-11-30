import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import AWS from 'aws-sdk';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function generateDiscussion(text: string): Promise<string> {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    Create a natural podcast-style discussion about the following content.
    Make it engaging and conversational, with clear transitions between topics.
    Include two speakers discussing the main points.
    Content: ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function convertToSpeech(text: string, voiceId: string): Promise<AWS.Polly.AudioStream> {
  const polly = new AWS.Polly({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params: AWS.Polly.SynthesizeSpeechInput = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: voiceId,
    Engine: 'neural',
  };

  const response = await polly.synthesizeSpeech(params).promise();
  if (!response.AudioStream) {
    throw new Error('No audio stream returned');
  }
  return response.AudioStream;
}
export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Generate discussion script
    const discussion = await generateDiscussion(text);

    // Split discussion into parts for different voices
    const parts = discussion.split(/Host [AB]:/g).filter(Boolean);
    
    // Convert each part with different voices
    const audioBuffers = await Promise.all(
      parts.map((part: string, index: number) => 
        convertToSpeech(part, index % 2 === 0 ? 'Matthew' : 'Joanna')
      )
    );

    // Concatenate audio buffers
    const combinedBuffer = Buffer.concat(audioBuffers as Buffer[]);
    const base64Audio = combinedBuffer.toString('base64');
    const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

    return NextResponse.json({ audioUrl, script: discussion });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    );
  }
}