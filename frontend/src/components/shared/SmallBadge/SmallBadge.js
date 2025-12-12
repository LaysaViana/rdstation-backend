import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

function makeSlug(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

const SmallBadge = React.forwardRef(function SmallBadge(
  {
    children,
    sx = {},
    className = '',
    bg,
    color,
    category,
    component = 'span',
    ...rest
  },
  ref
) {
  const slug = category ? makeSlug(category) : null;

  const initial = ['small-badge', slug ? `small-badge--${slug}` : null].filter(
    Boolean
  );

  const userClasses = String(className || '')
    .split(/\s+/)
    .filter(Boolean);
  const merged = Array.from(new Set([...initial, ...userClasses]));
  const classes = merged.join(' ');

  const colorSx = {};
  if (bg) colorSx.backgroundColor = bg;
  if (color) colorSx.color = color;

  return (
    <Chip
      ref={ref}
      component={component}
      label={children}
      size="small"
      className={classes}
      sx={{
        fontSize: '0.75rem',
        fontWeight: 500,
        gap: 1,
        padding: 0,
        ...sx,
        ...colorSx,
      }}
      {...rest}
    />
  );
});

SmallBadge.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  className: PropTypes.string,
  bg: PropTypes.string,
  color: PropTypes.string,
  category: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default React.memo(SmallBadge);
