import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tooltip, Typography } from '@mui/material';

const DEFAULT_TOOLTIP = (
  <Box sx={{ maxWidth: 260 }}>
    <Typography variant="body2" sx={{ mb: 1 }}>
      Este valor mostra o nível de compatibilidade entre o produto e suas
      escolhas: valores mais altos indicam maior compatibilidade.
    </Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
      Pontuação calculada a partir das preferências e funcionalidades
      selecionadas.
    </Typography>
  </Box>
);

function ScorePill({
  score,
  tooltip = DEFAULT_TOOLTIP,
  size = 56,
  sx = {},
  ...rest
}) {
  if (score === undefined || score === null) return null;

  return (
    <Tooltip
      title={tooltip}
      arrow
      disableTouchListener // mobile-friendly
    >
      <Box
        sx={{
          width: size,
          height: size,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(255,255,255,0.02)',
          cursor: 'help',
          flexShrink: 0,
          minWidth: 0,
          ...sx,
        }}
        aria-label={`${score} pontos`}
        role="img"
        tabIndex={0}
        {...rest}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1,
            color: 'var(--text)',
          }}
        >
          {score}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', lineHeight: 1.2 }}
        >
          pontos
        </Typography>
      </Box>
    </Tooltip>
  );
}

ScorePill.propTypes = {
  score: PropTypes.number,
  tooltip: PropTypes.node,
  size: PropTypes.number,
  sx: PropTypes.object,
};

export default React.memo(ScorePill);
