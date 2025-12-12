import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import { getCategoryColors } from '../../utils/categoryColors';
import BadgeList from '../shared/BadgeList/BadgeList';
import ScorePill from '../ScorePill/ScorePill';
import CardHeader from '../CardHeader/CardHeader';

function RecommendationCard({
  product,
  item,
  rank = 0,
  matchedPreferences = [],
  matchedFeatures = [],
}) {
  const prod = product || item || {};

  const sections = useMemo(
    () => [
      {
        title: 'Preferências compatíveis',
        items:
          Array.isArray(matchedPreferences) && matchedPreferences.length > 0
            ? matchedPreferences
            : prod.preferences ?? [],
      },
      {
        title: 'Funcionalidades compatíveis',
        items:
          Array.isArray(matchedFeatures) && matchedFeatures.length > 0
            ? matchedFeatures
            : prod.features ?? [],
      },
    ],
    [matchedPreferences, prod.preferences, prod.features, matchedFeatures]
  );

  if (!product && !item) return null;

  const isTopRanked = rank === 1;
  const categoryStyle = getCategoryColors(prod.category);

  const score =
    typeof prod.score === 'number' ? Math.min(prod.score, 100) : undefined;

  return (
    <Paper
      elevation={0}
      className="recommendation-card"
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        boxSizing: 'border-box',
        ...(isTopRanked
          ? { boxShadow: '0 10px 40px rgba(255,200,60,0.08)' }
          : {}),
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'flex-start' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 1,
          minWidth: 0,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CardHeader
            id={`rec-${prod.id || prod.name}`}
            name={prod.name}
            category={prod.category}
            categoryStyle={categoryStyle}
            isTopRanked={isTopRanked}
          />
        </Box>

        <Box
          sx={{
            mt: { xs: 1.25, sm: 0 },
            ml: { xs: 0, sm: 2 },
            alignSelf: { xs: 'flex-start', sm: 'center' },
            flexShrink: 0,
          }}
        >
          <ScorePill score={score} />
        </Box>
      </Box>

      {/* DESCRIPTION */}
      {prod.description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
            wordBreak: 'break-word',
            minWidth: 0,
          }}
        >
          {prod.description}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {sections.map((section) => {
          if (!section.items || section.items.length === 0) return null;

          return (
            <Box key={section.title}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 6,
                    height: 20,
                    borderRadius: 2,
                    flexShrink: 0,
                    background:
                      'linear-gradient(90deg, rgba(18,224,255,0.48), rgba(255,47,163,0.50))',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {section.title}:
                </Typography>
              </Box>

              <BadgeList
                items={section.items}
                badgeProps={{
                  sx: {
                    border: '1px solid rgba(255,255,255,0.03)',
                    backgroundColor: 'rgba(34,197,94,0.06)',
                    color: 'var(--muted)',
                    fontSize: '0.72rem',
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

RecommendationCard.propTypes = {
  product: PropTypes.object,
  item: PropTypes.object,
  rank: PropTypes.number,
  matchedPreferences: PropTypes.arrayOf(PropTypes.string),
  matchedFeatures: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(RecommendationCard);
