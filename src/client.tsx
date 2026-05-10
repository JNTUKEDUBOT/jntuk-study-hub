import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

declare global {
  interface Window {
    $_TSR?: { router?: unknown };
  }
}

function renderStaticFallback() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={getRouter()} />
    </StrictMode>,
  );
}

startTransition(() => {
  if (window.$_TSR?.router) {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
    return;
  }

  renderStaticFallback();
});