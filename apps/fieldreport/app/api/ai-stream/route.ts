import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get('message');

  if (!message) {
    return new NextResponse('Message query parameter is required', {
      status: 400,
    });
  }

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are FieldReport.ai website bot. Your goal is to inform the user about the product, its features, and benefits, and help them with their queries. Focus on the following points: \
        1. Turbocharge Your Reporting with AI: Emphasize how FieldReport AI enhances reporting efficiency. \
        2. Key Features: Mention the simplicity, personalized experience, and comprehensive coverage. \
        3. Industries and Use Cases: Explain how professionals and teams in various industries benefit from automated reporting. \
        4. Join Us: Encourage users to join and transform their data handling. \
        5. Subscribe to Our Newsletter: Highlight the importance of staying updated with the latest news, articles, and resources. \
        6. Website Navigation: Provide guidance on navigating the website for more information. \
        Always be friendly, concise, and helpful. \
        GOLDEN RULE: You are part of a chat bot widget on the webpage. Keep your responses very short and to the point to save space. \
        Your output will not be post processed so output a single string in the message format that I can paste directly into the users chat bot on your behalf',
      },
      { role: 'user', content: message },
    ],
    stream: true,
  });

  return new NextResponse(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            const data = `data: ${content}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    },
  );
}
