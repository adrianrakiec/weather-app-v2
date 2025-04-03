const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  singleQuote: true,
  endOfLine: 'crlf',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 8000,
      },
    },
  ],
};

export default config;
