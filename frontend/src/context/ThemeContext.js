import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';

const STORAGE_KEY = 'rd-station-theme';
const ThemeCtx = createContext(null);

const readStored = () => {
  try {
    if (typeof window === 'undefined') return null;
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }) => {
  const stored = readStored();
  const systemDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [mode, setMode] = useState(
    () => stored ?? (systemDark ? 'dark' : 'light')
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  const toggleTheme = useCallback(
    () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    []
  );
  const setTheme = useCallback(
    (next) => setMode(typeof next === 'function' ? next : () => next),
    []
  );

  const safeLight = lightTheme ?? { palette: { mode: 'light' } };
  const safeDark = darkTheme ?? { palette: { mode: 'dark' } };

  const muiTheme = useMemo(
    () => (mode === 'light' ? safeLight : safeDark),
    [mode]
  );

  const value = useMemo(
    () => ({ mode, setTheme, toggleTheme }),
    [mode, setTheme, toggleTheme]
  );

  return (
    <ThemeCtx.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeCtx.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return ctx;
};
