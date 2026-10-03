# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Frontend structure

- `src/App.tsx` selects the active page and connects it to workspace state.
- `src/Layouts/` contains the shared workspace shell and navigation.
- `src/Pages/` contains the login, overview, chat, documents, playground, and placeholder screens.
- `src/components/` contains reusable UI such as icons and page headers.
- `src/Context/` and `src/hooks/` provide shared workspace state and its typed hook.
- `src/api/` contains the shared HTTP client and endpoint-specific requests; `src/types/` and `src/utils/` hold shared types and workspace UI data.
- `src/main.tsx` mounts the provider and loads global styles.

Run `npm run dev` from this directory to start the frontend. Use `npm run build` and `npm run lint` to verify changes.

## FastAPI integration

Set `VITE_API_URL` in `.env` to `http://127.0.0.1:8000`. Chat, login, file upload, history, and the non-blocking API health indicator use the endpoint modules under `src/api/`.

The current backend is intentionally limited: chat returns an acknowledgment rather than a generated RAG answer; login/register currently acknowledge requests without validating credentials or returning session tokens; history does not yet return conversations; and upload currently accepts PDF only and confirms receipt without parsing or indexing. The UI reports these limitations and does not generate citations, retrieval results, history records, or processing status. Google sign-in remains unavailable until an OAuth endpoint exists. Registration has no frontend flow yet.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
