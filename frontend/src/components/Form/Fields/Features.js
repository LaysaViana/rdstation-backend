import { useState } from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import { handleEnterOrSpace } from '../../../utils/keyHandlers';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    if (typeof onFeatureChange === 'function') onFeatureChange(updatedFeatures);
  };

  return (
    <Box
      component="section"
      className="features-panel"
      sx={{
        mb: { xs: 2, md: 4 },
        p: { xs: 2, md: 3 },
        borderRadius: 'var(--radius-lg)',
        transition: 'all .3s ease',
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        className="text-muted"
        sx={{
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 600,
          color: 'var(--muted)',
        }}
      >
        Selecione suas funcionalidades:
      </Typography>

      {features.map((feature, index) => {
        const checked = currentFeatures.includes(feature);

        return (
          <Box
            key={index}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              handleEnterOrSpace(e, () => handleFeatureChange(feature))
            }
            onClick={() => handleFeatureChange(feature)}
            className={`feature-item ${checked ? 'is-checked' : ''}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 0.3,
              gap: 1,
              cursor: 'pointer',
              borderRadius: 1,
              transition: 'background-color .2s ease',
              outline: 'none',
              color: 'var(--muted)',
              '&:hover': {
                backgroundColor: 'var(--feature-hover-bg-light)',
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              },
            }}
          >
            <Checkbox
              checked={checked}
              onChange={() => handleFeatureChange(feature)}
              className="feature-checkbox"
              size="small"
            />

            <Typography
              sx={{ fontSize: { xs: '0.85rem', md: '1rem' }, color: 'inherit' }}
            >
              {feature}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default Features;
