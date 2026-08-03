import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { Privacy } from './pages/Privacy';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Privacy />
  </StrictMode>
);
