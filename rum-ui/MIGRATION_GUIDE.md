# Migration Guide: CRA to Vite

This guide helps you migrate from Create React App (CRA) to Vite.

## Changes Made

### 1. Package.json Updates

**Removed:**
- `react-scripts`
- CRA-specific scripts

**Added:**
- `vite`
- `@vitejs/plugin-react`
- Vite-specific scripts

**New Scripts:**
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 2. Entry Point Changes

**Old (CRA):** `src/index.js`
```jsx
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

**New (Vite):** `src/main.jsx`
```jsx
import ReactDOM from 'react-dom/client';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### 3. HTML File Location

**Old:** `public/index.html` (with inline script)
**New:** `index.html` (root level, with module script)

### 4. Configuration

**Old:** `package.json` with CRA config
**New:** `vite.config.js` with Vite config

### 5. Environment Variables

**Old:** `REACT_APP_*`
**New:** `VITE_*`

Update any environment variables:
- `REACT_APP_API_URL` → `VITE_API_URL`
- Access via `import.meta.env.VITE_API_URL`

## Running the App

### Development
```bash
npm run dev
# or
npm start
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Benefits of Vite

1. **Faster Development** - Instant server start
2. **Faster HMR** - Hot Module Replacement
3. **Better Build Performance** - Uses esbuild
4. **Smaller Bundle Size** - Better tree-shaking
5. **Modern Tooling** - Native ESM support

## Troubleshooting

### Port Already in Use
Update `vite.config.js`:
```js
server: {
  port: 3001, // Change port
}
```

### Module Not Found
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Check for:
- Import paths (use relative paths)
- Environment variables (use VITE_ prefix)
- CSS imports (should work as-is)

## Next Steps

1. Test all features
2. Update CI/CD if needed
3. Update documentation
4. Remove old CRA files if any

