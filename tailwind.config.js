/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: "#021024",
        "primary-lighter": "#003153",
        secondary: "#5483b3",
        "secondary-lighter": "#7da0ca",
        accent: "#c1e8ff",
        "white-text": "rgba(255, 255, 255, 0.9)",
      },
      spacing: {
        five: "1215.98px",
        four: " 751.53px",
        three: "464.48px",
        two: "287.07px",
        one: "177.42px",
        large: "109.66px",
        med: "67.77px",
        small: "41.89px",
        xsmall: "25.88px",
        "2xsmall": "16px",
        "3xsmall": "9.89px",
      },
      fontSize: {
        two: ["6.8537rem", "1"],
        one: ["4.2356rem", "1"],
        large: ["2.6181rem", "2.8799rem"],
        med: ["1.6175rem", "2.0704rem"],
        small18: ["1.125rem", "1.5rem"],
        small: ["1rem", "1.5rem"],
        xsmall: ["0.6181rem", "0.883rem"],
      },
    },
  },
  plugins: [],
};
