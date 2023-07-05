module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:tailwindcss/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react', 'react-refresh', 'jsx-a11y'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'no-console': 'warn',

        // Rules below derived from eslint-plugin-next
        'react/no-unknown-property': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/alt-text': [
            'warn',
            {
                elements: ['img'],
            },
        ],
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'react/jsx-no-target-blank': 'off',
    },
};
