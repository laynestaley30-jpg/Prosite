export default async function handler(req, res) {
  // Vercel-style serverless function to proxy chat to OpenAI. Do not commit your API key.
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'Missing message in request body' });

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Missing OPENAI_API_KEY on server' });

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Nova, a helpful assistant integrated into a personal web dashboard.' },
        { role: 'user', content: message }
      ],
      max_tokens: 600,
      temperature: 0.7
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(502).json({ error: 'OpenAI API error', detail: errText });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message || String(err) });
  }
}
