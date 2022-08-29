/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        prim1: "var(--bg-prim1)",
        prim2: "var(--bg-prim2)",
        seco1: "var(--bg-seco1)",
        // seco2: "var(--bg-seco2)",
      },
      backgroundColor: {
        prim1: "var(--bg-prim1)",
        prim2: "var(--bg-prim2)",
        seco1: "var(--bg-seco1)",
        seco2: "var(--bg-seco2)",
      },
      textColor: {
        prim1: "var(--text-prim1)",
        prim2: "var(--bg-prim2)",
        prim3: "var(--bg-prim3)",
      },
    },
  },
  plugins: [],
};
