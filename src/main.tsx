import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { config } from "./reactive-dot.ts";
import { ReactiveDotProvider, ChainProvider } from "@reactive-dot/react";
import { ThemeProvider } from "./contexts/theme-context";

import "./index.css";
import App from "./App.tsx";
import Loading from "./components/Loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ReactiveDotProvider config={config}>
        <ChainProvider chainId="paseo">
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </ChainProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  </StrictMode>,
);
