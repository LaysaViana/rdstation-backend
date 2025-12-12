import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../context/ThemeContext';

export const Header = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box
      component="header"
      className="app-bg-only bg-2 app-header"
      sx={{
        py: { xs: 3, md: 4 },
        position: 'relative',
      }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <Box
            className="header-left"
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <img
              src="/rd-station-logo.svg"
              alt="logo"
              className="header-logo"
            />

            <Box className="header-separator" />

            <Typography
              variant="h5"
              className="app-header-title"
              sx={{
                fontWeight: 'bold',
                textAlign: 'left',
                color: 'var(--text)',
                flexShrink: 0,
              }}
            >
              Recomendador de Produtos RD Station
            </Typography>
          </Box>

          <IconButton
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="header-theme-toggle"
            sx={{
              color: 'var(--text)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </div>
    </Box>
  );
};
