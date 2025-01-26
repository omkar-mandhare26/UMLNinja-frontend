/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: { DEFAULT: "#121826" },
                primary: {
                    100: "#DFE9F4",
                    200: "#C2D3EA",
                    300: "#8FA3C1",
                    400: "#596883",
                    500: "#1C2331",
                    600: "#141A2A",
                    700: "#0E1323",
                    800: "#080D1C",
                    900: "#050817",
                    hover: "#252E3C",
                },
                secondary: { DEFAULT: "#2E3A55", hover: "#374259" },
                accent: { DEFAULT: "#141A26" },
                info: { DEFAULT: "#64B5F6", hover: "#5396C4" },
                success: {
                    DEFAULT: "#5cb85c",
                    hover: "#4cae4c",
                },
                warning: { DEFAULT: "#FFB74D", hover: "#E6A041" },
                danger: { DEFAULT: "#E57373", hover: "#CC5F5F" },
            },
            textColor: { DEFAULT: "#FFFFFF" },
            fontFamily: {
                heading: ["Merriweather Sans", "sans-serif"],
                body: ["Source Code Pro", "monospace"],
            },
        },
    },
    plugins: [],
};
