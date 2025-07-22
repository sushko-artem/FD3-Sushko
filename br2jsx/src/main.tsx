import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container font-bold h-[100vh] max-w-[500px] flex flex-col justify-center mx-auto px-3 sm:px-4 lg:px-5">
      <App />
    </div>
  </StrictMode>
);
