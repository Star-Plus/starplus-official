/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                // Adding some custom colors for the game studio vibe
                'space-black': '#050510',
                'neon-blue': '#00f2ff',
                'neon-purple': '#bf00ff',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'display': ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
