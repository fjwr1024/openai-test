import openaiClient from './shared/openapi-client';

export const sendMessage = async (inputText: string) => {
  const completion = await openaiClient.chat.completions.create({
    messages: [{ role: 'system', content: inputText }],
    model: 'gpt-4-1106-preview',
    max_tokens: 500,
  });

  console.log('# completion', completion);
  console.log('# message', completion.choices[0].message);
};

const inputText = process.argv[2];
sendMessage(inputText)
  .then(() => console.log('Message sent successfully'))
  .catch(error => console.error('Failed to send message:', error));
