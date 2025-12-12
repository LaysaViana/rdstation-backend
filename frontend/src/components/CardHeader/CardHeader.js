import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SmallBadge from '../shared/SmallBadge/SmallBadge';

const WRAPPER_SX = { display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 };
const TITLE_SX = {
  fontWeight: 700,
  lineHeight: 1.2,
  whiteSpace: 'normal',
  wordBreak: 'break-word',
};

function makeSlug(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

/* ---------------- componente ---------------- */

function CardHeader({ name, category, categoryStyle, isTopRanked, id }) {
  const badgeClass = category
    ? `small-badge small-badge--${makeSlug(category)}`
    : 'small-badge';
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={WRAPPER_SX}>
        {isTopRanked && <EmojiEventsIcon className="rank-icon" aria-hidden />}

        <Typography id={id} variant="subtitle1" sx={TITLE_SX} title={name}>
          {name}
        </Typography>
      </Box>
      <SmallBadge className={badgeClass}>{category}</SmallBadge>
    </Box>
  );
}

CardHeader.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  categoryStyle: PropTypes.shape({
    bg: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  isTopRanked: PropTypes.bool,
};

export default React.memo(CardHeader);
