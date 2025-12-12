import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import SmallBadge from '../SmallBadge/SmallBadge';

export default function BadgeList({
  items = [],
  badgeProps = {},
  stackProps = {},
  getKey = (item, idx) => `${item}-${idx}`,
}) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ flexWrap: 'wrap', ...stackProps.sx }}
      {...stackProps}
    >
      {items.map((item, idx) => (
        <SmallBadge key={getKey(item, idx)} category={item} {...badgeProps}>
          {item}
        </SmallBadge>
      ))}
    </Stack>
  );
}

BadgeList.propTypes = {
  items: PropTypes.array,
  badgeProps: PropTypes.object,
  stackProps: PropTypes.object,
  getKey: PropTypes.func,
};
