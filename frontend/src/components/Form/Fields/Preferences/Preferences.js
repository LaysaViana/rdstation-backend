import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { handleEnterOrSpace } from '../../../../utils/keyHandlers';
import { Checkbox } from '../../../shared/Checkbox/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    if (typeof onPreferenceChange === 'function')
      onPreferenceChange(updatedPreferences);
  };

  return (
    <Box
      component="section"
      className="preferences-panel"
      sx={{
        mb: { xs: 2, md: 4 },
        p: { xs: 2, md: 3 },
        borderRadius: 'var(--radius-lg)',
        transition: 'all .3s ease',
      }}
    >
      <Typography
        variant="h6"
        className="text-muted"
        sx={{
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 600,
        }}
      >
        Selecione suas preferências:
      </Typography>

      {preferences.map((preference, index) => {
        const checked = currentPreferences.includes(preference);

        return (
          <Box
            key={index}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              handleEnterOrSpace(e, () => handlePreferenceChange(preference))
            }
            onClick={() => handlePreferenceChange(preference)}
            className={`preference-item ${checked ? 'is-checked' : ''}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 0.3,
              gap: 1,
              cursor: 'pointer',
              borderRadius: 1,
              transition: 'background-color .2s ease',
              outline: 'none',
            }}
          >
            <Checkbox
              id={`feat-${index}`}
              checked={checked}
              onChange={() => handlePreferenceChange(preference)}
              className="preference-checkbox"
              size="small"
            />

            <Typography
              className="text-muted"
              sx={{
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              {preference}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default Preferences;
