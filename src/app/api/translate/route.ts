import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
   async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received POST request:', req.body);
  res.status(200).json({ message: "POST request handled" });
}

 async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received GET request');
  res.status(405).json({ error: "Method Not Allowed" });
}
  
  

  const { text, target } = req.body;

  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      'api-version': '3.0',
      profanityAction: 'NoAction',
      textType: 'plain',
      to: target,
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error translating text' });
  }
}
