import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Asegúrate de que no haya una configuración `css` que bloquee a PostCSS. // Si la tuvieras, bórrala o coméntala. // css: { //   modules: false, // },
  build: {
    sourcemap: false,
  },
});
