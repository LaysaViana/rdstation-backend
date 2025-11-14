import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../context/ThemeContext';

export const Footer = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor:
          mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.grey[100],
        borderTop: `1px solid ${
          mode === 'dark' ? theme.palette.divider : theme.palette.grey[300]
        }`,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
      }}
    >
      <Typography variant="body2">
        Desenvolvido por <strong>Laysa Viana</strong>
      </Typography>

      <Box sx={{ mt: 1 }}>
        <a
          href="https://github.com/LaysaViana"
          target="_blank"
          rel="noreferrer"
          style={{ marginRight: '12px' }}
        >
          <img src="/github.png" alt="GitHub" width={24} height={24} />
        </a>
        <a
          href="https://linkedin.com/in/laysa-viana"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
        </a>
      </Box>
    </Box>
  );
};
