import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { MapLayersProvider } from 'context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <CssBaseline />
    <MapLayersProvider>
      <App />
    </MapLayersProvider>
  </>
);
