// src/components/shared/Tooltip/TooltipProvider.jsx
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';

export const DefaultTooltip = ({ title, children, ...rest }) => (
  <Tooltip title={title} arrow enterDelay={300} leaveDelay={50} {...rest}>
    {children}
  </Tooltip>
);

DefaultTooltip.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
