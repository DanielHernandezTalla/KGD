import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        dashboard: "calc(100vw - 80px)",
        mddashboard: "calc(100vw - 275px - 20px)",
      },
      minWidth: {
        10: "12rem",
        12: "14rem",
        16: "18rem",
      },
      maxWidth: {
        nav: "240px",
        form: "600px",
      },
      minHeight: {
        20: "5rem"
      },
      gridTemplateColumns: {
        quickAction: "repeat(auto-fit,minmax(220px,1fr));",
        buttonData: "repeat(auto-fit,minmax(290px,1fr));",
      },
    },
  },
  plugins: [],
};
export default config;
