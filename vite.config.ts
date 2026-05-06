import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA mode produces a static client build (dist/client) with index.html that
// can be hosted on any static host (Vercel, Firebase, Netlify, S3, etc.) using
// SPA fallback rewrites to /index.html.
export default defineConfig({
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: false,
      },
    },
  },
});
