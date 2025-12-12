import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Chip, Paper, Divider } from '@mui/material';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';

function RecommendationList({
  recommendations = [],
  mode = 'MultipleProducts',
}) {
  const count = recommendations.length;
  const single = mode === 'SingleProduct';
  const title = single ? 'Produto Recomendado' : 'Recomendações Encontradas';

  if (!count) {
    return (
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: { xs: 2, md: 3 },
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'var(--panel-border)',
          bgcolor: 'transparent',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          Nenhuma recomendação encontrada.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Tente ajustar suas preferências e clique em{' '}
          <strong>“Obter recomendação”</strong>.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        <Divider sx={{ mb: 3 }} />

        {/* HEADER */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Quantidade:
            </Typography>

            <Chip
              label={count}
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.125rem',
                bgcolor: 'rgba(255,255,255,0.02)',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.15)'
                    : '1px solid rgba(0,0,0,0.25)',
              }}
            />
          </Box>
        </Box>

        {/* SINGLE PRODUCT */}
        {single ? (
          <Paper
            elevation={0}
            className={`glass-card card-color-${1}`}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              transition: 'transform .25s ease',
              '&:hover': { transform: 'translateY(-4px)' },
              bgcolor: 'transparent',
              width: '100%',
              maxWidth: '700px',
              mx: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <RecommendationCard item={recommendations[0]} />
          </Paper>
        ) : (
          /* MULTIPLE PRODUCTS GRID */
          <Box
            sx={{
              mt: 2,
              borderRadius: 3,
              display: 'grid',
              gap: 2,
              width: '100%',
              gridTemplateColumns: {
                xs: 'repeat(auto-fit, minmax(260px, 1fr))',
                sm: 'repeat(auto-fit, minmax(300px, 1fr))',
              },
              boxSizing: 'border-box',
            }}
          >
            {recommendations.map((r, idx) => (
              <Paper
                key={r.id ?? idx}
                elevation={0}
                className={`glass-card card-color-${(idx % 4) + 1}`}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  transition: 'transform .25s ease',
                  '&:hover': { transform: 'translateY(-4px)' },
                  bgcolor: 'transparent',
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <RecommendationCard item={r} rank={idx + 1} />
              </Paper>
            ))}
          </Box>
        )}
      </div>
    </Box>
  );
}

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.oneOf(['SingleProduct', 'MultipleProducts']),
};

export default React.memo(RecommendationList);
