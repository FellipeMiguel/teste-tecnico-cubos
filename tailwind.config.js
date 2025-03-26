module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Configuração correta para suportar opacidade
        background: "rgba(var(--background), <alpha-value>)",
        foreground: "rgba(var(--foreground), <alpha-value>)",
        primary: "rgba(var(--primary), <alpha-value>)",
        border: "rgba(var(--border), <alpha-value>)",
      },
    },
  },
};
