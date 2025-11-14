import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../../context/ThemeContext';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);
  const theme = useTheme();
  const { mode } = useThemeMode();

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  const backgroundColor = theme.palette.background.paper;
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
        Funcionalidades:
      </Typography>

      {features.map((feature, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': { color: theme.palette.primary.main },
              }}
            />
          }
          label={feature}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
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
        />
      ))}
    </Box>
  );
}

export default Features;
