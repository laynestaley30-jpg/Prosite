# AI integration (server-backed)

This repo now includes a simple server-backed AI assistant implementation.

Files added:
- `Nova.html` — frontend chat UI. Clicking your existing Nova AI button (which points to `Nova.html`) will open this page.
- `api/chat.js` — a Vercel-style serverless function that proxies messages to the OpenAI Chat Completions API. It expects the environment variable `OPENAI_API_KEY` to be set in the deployment environment.

How to deploy

1. Deploy the site to Vercel (recommended) or another platform that supports serverless functions.
2. Set the environment variable `OPENAI_API_KEY` in your deployment (do NOT commit your API key to the repo).
3. The frontend will POST to `/.netlify/functions/chat` on Netlify or `/api/chat` on Vercel. The provided `api/chat.js` is structured for Vercel's `/api` route. If you use Netlify or another host, adapt the function accordingly.

Security

- Keep your API key secret. Use the hosting platform's environment variable settings.
- Consider adding rate-limiting / authentication on the server endpoint to prevent abuse.

Customize

- To use a different model, change `model` in `api/chat.js`.
- To open the assistant in a modal rather than a separate page, I can update the main `index.html` to include the chat UI as an overlay instead of a separate file.

If you want, I can:
- Add server-side rate-limiting or simple token-based auth for the endpoint.
- Update `index.html` to open the assistant as a modal instead of navigating to `Nova.html`.
