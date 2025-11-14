import React, { useState } from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../../context/ThemeContext';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);
  const theme = useTheme();
  const { mode } = useThemeMode();

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  const backgroundColor =
    mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.paper;

  const borderColor =
    mode === 'dark'
      ? theme.palette.secondary.main + '33'
      : theme.palette.primary.main + '22';

  return (
    <Box
      sx={{
        mb: 4,
        backgroundColor,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        p: 3,
        boxShadow:
          mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        }}
      >
        Preferências:
      </Typography>

      {preferences.map((preference, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
            gap: 1,
            borderRadius: 1,
            cursor: 'pointer',
            p: 0.8,
            '&:hover': {
              backgroundColor:
                mode === 'light'
                  ? theme.palette.action.hover
                  : theme.palette.action.selected,
            },
            transition: 'background-color 0.2s ease',
          }}
          onClick={() => handlePreferenceChange(preference)}
        >
          <Checkbox
            checked={currentPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
            sx={{
              color: theme.palette.primary.main,
              '&.Mui-checked': {
                color: theme.palette.primary.main,
              },
            }}
          />

          <Typography sx={{ color: theme.palette.text.secondary }}>
            {preference}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Preferences;
