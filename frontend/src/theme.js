// src/theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0175ff', contrastText: '#fff' },
    secondary: { main: '#ff0078' },
    background: { default: '#f5f7fb', paper: '#ffffff' },
    text: { primary: '#0f1724', secondary: 'rgba(15,23,36,0.68)' },
  },
  shape: { borderRadius: 14 },
  typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#12e0ff', contrastText: '#041222' },
    secondary: { main: '#ff2fa3' },
    background: { default: '#05040b', paper: '#0b0f17' },
    text: { primary: '#e6f6ff', secondary: 'rgba(255,255,255,0.65)' },
  },
  shape: { borderRadius: 14 },
  typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
});
