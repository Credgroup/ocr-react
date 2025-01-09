import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Clarity from '@microsoft/clarity';
const projectId = import.meta.env.VITE_CLARITY_ID_KEY;

Clarity.init(projectId);
console.log("Projeto iniciado com id:", projectId)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
