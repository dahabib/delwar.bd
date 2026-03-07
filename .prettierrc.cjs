module.exports = {
  // Use the .prettierignore file to specify files to ignore
  // for formatting by Prettier.
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  printWidth: 100, // Adjust this to your preference
  semi: true, // Add semicolons
  singleQuote: true, // Use single quotes
  tabWidth: 2, // Use 2 spaces for indentation
  trailingComma: "all", // Add trailing commas where valid
  useTabs: false, // Use spaces instead of tabs
  // Svelte specific
  svelteSortOrder: "options-scripts-markup-styles",
  svelteStrictMode: false,
  svelteBracketNewLine: true,
  svelteIndentScriptAndStyle: true,
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
