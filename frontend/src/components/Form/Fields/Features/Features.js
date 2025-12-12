import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { handleEnterOrSpace } from '../../../../utils/keyHandlers';
import { Checkbox } from '../../../shared/Checkbox/Checkbox';
import PropTypes from 'prop-types';
function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(() =>
    Array.isArray(selectedFeatures) ? selectedFeatures.slice() : []
  );

  const handleFeatureChange = (feature, isChecked) => {
    setCurrentFeatures((prev) => {
      let updated;
      if (typeof isChecked === 'boolean') {
        updated = isChecked
          ? prev.includes(feature)
            ? prev
            : [...prev, feature]
          : prev.filter((p) => p !== feature);
      } else {
        // toggle
        updated = prev.includes(feature)
          ? prev.filter((p) => p !== feature)
          : [...prev, feature];
      }

      if (typeof onFeatureChange === 'function') onFeatureChange(updated);
      return updated;
    });
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
            key={typeof feature === 'string' ? feature : index}
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
              id={`feat-${index}`}
              checked={checked}
              onChange={(e) => handleFeatureChange(feature, e.target.checked)}
              inputClassName="checkbox"
              className="checkbox-root"
              size="small"
              aria-label={String(feature)}
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

Features.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  selectedFeatures: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onFeatureChange: PropTypes.func,
};

export default Features;
