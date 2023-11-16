import { DiscussServiceClient } from "@google-cloud/dialogflow-discuss";
import { GoogleAuth } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const MODEL_NAME = "models/chat-bison-001";
  const API_KEY = "AIzaSyCdf0QI11bfqok5uX1UXuTvonUkeOF8ooM";
  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required.' });
  }

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

  try {
    const result = await client.generateMessage({
      model: MODEL_NAME,
      temperature: 0.5,
      candidateCount: 1,
      prompt: {
        context: 'Respond to all the questions in a good manner.',
        messages: [{ content: query }],
      },
    });

    const ans = result[0].candidates[0].content;
    res.json({ ans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
