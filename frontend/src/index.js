import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeModeProvider } from './context/ThemeContext';
import { CssBaseline, GlobalStyles } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeModeProvider>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        })}
      />
      <App />
    </ThemeModeProvider>
  </React.StrictMode>
);
