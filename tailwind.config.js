// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 Actualiza esta línea
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue for branding
        secondary: "#10B981", // Green for actions
        accent: "#F3F4F6", // Light gray for backgrounds
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
