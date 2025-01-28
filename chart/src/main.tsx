import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

rootElement.classList.add('min-h-full');
rootElement.classList.add('w-full');
rootElement.classList.add('flex');
rootElement.classList.add('flex-col');
rootElement.classList.add('overflow-auto');

// flex-col overflow-auto
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
