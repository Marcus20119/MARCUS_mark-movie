import PropTypes from 'prop-types';

const ButtonPrimary = ({
  type = 'button',
  className = '',
  onClick = () => {},
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center gap-2 w-full bg-[var(--primary-color)] py-[10px] rounded-[0.65rem] text-white font-bold opacity-80 hover:opacity-100 tracking-wider ${className}`}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ButtonPrimary };
