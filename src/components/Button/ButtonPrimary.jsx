import PropTypes from 'prop-types';

const ButtonPrimary = ({
  type = 'button',
  className = '',
  disabled = false,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 w-full bg-[var(--primary-color)] py-[10px] rounded-[0.65rem] text-white font-bold opacity-80 hover:opacity-100 tracking-wider disabled:!opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export { ButtonPrimary };
