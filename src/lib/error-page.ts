export function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>JNTUK Study Hub</title>
    <style>
      :root { color-scheme: dark; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #071126; color: #f8fafc; }
      main { width: min(92vw, 440px); text-align: center; }
      h1 { margin: 0; font-size: clamp(1.8rem, 5vw, 2.6rem); }
      p { color: #b6c2d6; line-height: 1.6; }
      div { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
      button, a { border-radius: 8px; border: 1px solid #334155; padding: 10px 16px; color: #f8fafc; background: #0f1b33; text-decoration: none; font-weight: 700; cursor: pointer; }
      button:first-child { background: #3b82f6; border-color: #3b82f6; color: white; }
    </style>
  </head>
  <body>
    <main>
      <h1>JNTUK Study Hub</h1>
      <p>The app hit a startup error. Refresh the page, or return home and try again.</p>
      <div>
        <button onclick="location.reload()">Refresh</button>
        <a href="/">Go home</a>
      </div>
    </main>
  </body>
</html>`;
}