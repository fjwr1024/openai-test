import openaiClient from './shared/openapi-client';

async function sendMessage() {
  const completion = await openaiClient.chat.completions.create({
    messages: [{ role: 'system', content: inputText }],
    model: 'gpt-4-1106-preview',
    max_tokens: 500,
  });

  console.log(completion);
  console.log(completion.choices[0].message);
}

const inputText = process.argv[2];
sendMessage();
