import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
  // Ignorar arquivos ou diretórios
  { ignores: ['dist', 'node_modules', 'cypress.config.cjs', 'cypress/e2e/**' ] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],

     // Opções da linguagem e parser
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },      // Configurações específicas para plugins (como o do React)
    settings: {
      react: {
        version: 'detect',
      },
      // Configuração para import/parsers se necessário:
      'import/parsers': {
        ['@typescript-eslint/parser']: ['.ts', '.tsx', '.d.ts'],
      },
    },
    
    // Plugins que serão utilizados
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'simple-import-sort/imports': "error",
      'simple-import-sort/exports': "error",
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/self-closing-comp': 'error',
      'prettier/prettier': ['error', {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
        endOfLine: 'auto',
        offsetTernaryExpressions: true,
      }],
      // '@typescript-eslint/no-require-imports': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/alt-text': ['warn', {
        elements: ['img'],
        img: ['Image'],
      }],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'react/no-unknown-property': 'error',

    },
  },
  {
    
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Sobrescreve a regra após as recomendações
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Configuração específica para arquivos .cjs (como prettier.config.cjs)
  {
    files: ['prettier.config.cjs'],
    languageOptions: {
      globals: {
        // Define variáveis globais Node, por exemplo `module`, `require`, etc.
      },
      parserOptions: {
        sourceType: 'script', // Para arquivos Node tradicionais pode ser script
      },
    },
    // Define o ambiente Node para esses arquivos
    settings: {},
    plugins: {},
    rules: {},
  }
)