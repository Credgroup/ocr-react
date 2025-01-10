import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*", // Permite todas as origens (ou substitua * por um domínio específico)
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Permite métodos específicos
      "Access-Control-Allow-Headers":
        "Content-Type, multipart/form-data, Authorization", // Permite cabeçalhos específicos
    },
  },
});
