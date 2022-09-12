/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        smM: { raw: "(max-width: 640px)" },
        // => custom for maxwidth use to remove main nav bar after width is lesser than 640px

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        caglisotro: ["Cagliostro", "sans-serif"],
        baloo: ["baloo2"],
        sofiaPro: ["sofiapro", "sans-serif"],
      },
      colors: {
        prim1: "var(--bg-prim1)",
        prim2: "var(--bg-prim2)",
        seco1: "var(--bg-seco1)",
        seco2: "var(--bg-seco2)",
        error: "var(--error)",
        success: "var(--success)",
      },
      backgroundColor: {
        prim1: "var(--bg-prim1)",
        prim2: "var(--bg-prim2)",
        seco1: "var(--bg-seco1)",
        seco2: "var(--bg-seco2)",
      },
      textColor: {
        prim1: "var(--text-prim1)",
        prim2: "var(--text-prim2)",
        prim3: "var(--text-prim3)",
        error: "var(--error)",
        success: "var(--success)",
      },
    },
  },
  plugins: [],
};
