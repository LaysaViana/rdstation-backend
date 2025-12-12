import PropTypes from 'prop-types';

export default function SubmitButton({
  children = 'Enviar',
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  ariaLabel,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : 'Enviar')
      }
      className={`cta-button ${className}`.trim()}
      {...rest}
    >
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span style={{ marginLeft: 8 }}>Carregando...</span>
        </>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {children}
        </span>
      )}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};
