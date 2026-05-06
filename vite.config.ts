// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA mode: produces a static client build (dist/client) with index.html that
// can be hosted on any static host (Vercel, Firebase Hosting, Netlify, S3, etc.)
// without a server runtime. All routes are served from index.html via SPA fallback.
export default defineConfig({
  tanstackStart: {
    spa: {
      enabled: true,
    },
  },
});
