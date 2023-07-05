/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'cyan-strong': 'hsl(var(--cyan-strong) / <alpha-value>)',
                'cyan-strong-light':
                    'hsl(var(--cyan-strong-light) / <alpha-value>)',
                'cyan-very-dark': 'hsl(var(--cyan-very-dark) / <alpha-value>)',
                'cyan-dark-grayish':
                    'hsl(var(--cyan-dark-grayish) / <alpha-value>)',
                'cyan-grayish': 'hsl(var(--cyan-grayish) / <alpha-value>)',
                'cyan-light-grayish':
                    'hsl(var(--cyan-light-grayish) / <alpha-value>)',
                'cyan-very-light-grayish':
                    'hsl(var(--cyan-very-light-grayish) / <alpha-value>)',
                error: 'hsl(var(--error) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};
