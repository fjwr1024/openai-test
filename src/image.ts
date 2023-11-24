////////////////////////////////
// command : ts-node image.ts "Enter your text here" "sample.png"
////////////////////////////////

import * as fs from 'fs';
import * as util from 'util';

import openaiClient from './shared/openapi-client';
import { validateFishType } from './utils/validate-fishtype';

function encodeImageToBase64(filePath: string) {
  try {
    return fs.readFileSync(filePath, { encoding: 'base64' });
  } catch (error) {
    console.error('Failed to read the image file:', error);
    process.exit(1);
  }
}

export const uploadImage = async (imagePath: string, inputText: string) => {
  const base64Image = encodeImageToBase64(imagePath);

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4-vision-preview',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: inputText },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log(
      '# response',
      util.inspect(response, { showHidden: false, depth: null, colors: true })
    );

    console.log('# message', response.choices[0].message);
    const isValidFishType = validateFishType(response.choices[0].message.content);
    console.log('#, isValidFishType', isValidFishType);

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Failed to send the request to OpenAI:', error);
    process.exit(1);
  }
};

const inputText = process.argv[2];
const imageName = process.argv[3];

if (!inputText) {
  console.error('Please provide the text for analysis.');
  process.exit(1);
}

if (!imageName) {
  console.error('Please provide the path of the image.');
  process.exit(1);
}

const imagePath = `./images/${imageName}`;
uploadImage(imagePath, inputText);
