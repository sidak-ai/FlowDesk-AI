FlowDesk AI — Local dev & deployment instructions
-------------------------------------------------

This package includes a static site and a simple Node.js Express server that forwards chat requests to the OpenAI API.

Files:
- index.html, style.css, script.js : static site (served from /public in production). 
- server.js : Node/Express server (ES module style)
- package.json : dependencies
- README.md : this file

Setup (local):
1. Install Node.js (v18+ recommended).
2. In the project folder run: npm install
3. Create a .env file in the project root with:
   OPENAI_API_KEY=your_openai_api_key_here
4. Start the server: npm run start
5. Open http://localhost:3000 in your browser.

Notes & Security:
- Keep your OpenAI API key secret. Do NOT commit .env to git.
- The server uses the OpenAI Responses API. Model name in server.js may need to be changed depending on availability and billing.
- For production hosting, consider services like Render, Heroku, Railway, or Vercel (serverless functions).
