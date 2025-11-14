import { createTheme } from '@mui/material/styles';

// ================== THEME CLARO ==================
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0052CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1d3557',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#4B5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700, fontSize: '2rem' },
    h5: { fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '10px 22px',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#0073E6',
          '&.Mui-checked': {
            color: '#0052CC',
          },
        },
      },
    },
  },
});

// ================== THEME ESCURO ==================
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0073E6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0052CC',
    },
    background: {
      default: '#0B0C10',
      paper: '#0B0C10',
    },
    text: {
      primary: '#E3F2FD',
      secondary: '#AAB4BE',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700, fontSize: '2rem' },
    h5: { fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '10px 22px',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#121417',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#0073E6',
          '&.Mui-checked': {
            color: '#66B2FF',
          },
        },
      },
    },
  },
});
