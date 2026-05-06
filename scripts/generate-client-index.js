import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const clientDir = path.join(distDir, "client");
const assetsDir = path.join(clientDir, "assets");
const serverDir = path.join(distDir, "server");

if (!fs.existsSync(clientDir) || !fs.existsSync(assetsDir)) {
  throw new Error("dist/client or dist/client/assets does not exist. Run npm run build first.");
}

const files = fs.readdirSync(assetsDir);
const jsFile = files.find((f) => /^index-.*\.js$/.test(f));
const cssFile = files.find((f) => /^styles-.*\.css$/.test(f));

if (!jsFile) {
  throw new Error("Could not find client entry JS file in dist/client/assets.");
}

// Use absolute paths (/assets/...) so deep links served via SPA fallback
// (e.g. /notes/123 → /index.html) still resolve assets correctly.
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/lovable-uploads/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JNTUK Study Hub</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(clientDir, "index.html"), html);
console.log("Generated dist/client/index.html (absolute asset paths)");

// Clean up: remove the server build (only needed for Lovable/Cloudflare SSR
// hosting). Static hosts (Vercel, Firebase, Netlify) only need dist/client.
if (fs.existsSync(serverDir)) {
  fs.rmSync(serverDir, { recursive: true, force: true });
  console.log("Removed dist/server (not needed for static hosting)");
}

// Remove vite manifest dir from client build if present
const viteMetaDir = path.join(clientDir, ".vite");
if (fs.existsSync(viteMetaDir)) {
  fs.rmSync(viteMetaDir, { recursive: true, force: true });
}

// Copy SPA fallback files so static hosts that don't read vercel.json /
// firebase.json (e.g. Netlify, plain S3) also serve index.html on deep links.
fs.writeFileSync(path.join(clientDir, "_redirects"), "/*    /index.html   200\n");
fs.writeFileSync(
  path.join(clientDir, "404.html"),
  fs.readFileSync(path.join(clientDir, "index.html"))
);
console.log("Wrote SPA fallback files (_redirects, 404.html)");
