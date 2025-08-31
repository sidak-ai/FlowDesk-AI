// Simple Express server to proxy requests to OpenAI
// IMPORTANT: Set environment variable OPENAI_API_KEY before running.
// Install: npm install express cors openai dotenv
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try{
    const userMsg = req.body.message || '';
    if(!userMsg) return res.status(400).json({error:'No message'});

    // Build prompt + assistant system instructions
    const system = `You are FlowDesk AI, a friendly, concise AI receptionist for small businesses. Answer callers' questions about services, bookings, pricing, and how to book a demo. Always ask clarifying questions if needed and offer to book a meeting.`;

    // Use Responses API
    const response = await client.responses.create({
      model: 'gpt-4o-mini', // choose model available on your account
      input: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg }
      ],
      max_output_tokens: 500
    });

    // Extract plain text (depends on response format)
    const reply = response.output && response.output[0] && response.output[0].content && response.output[0].content[0] && response.output[0].content[0].text
      ? response.output[0].content[0].text
      : (response.output_text || 'Sorry, I could not generate a reply.');

    res.json({ reply });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
