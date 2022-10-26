import PropTypes from 'prop-types';

const ButtonPlay = ({
  type = 'button',
  className = '',
  message = '',
  widthType = 'full',
  disabled = false,
}) => {
  let widthClassName = '';
  switch (widthType) {
    case 'full':
      widthClassName = 'w-full';
      break;
    case 'fit':
      widthClassName = 'w-auto py-[0.75rem] px-[2rem]';
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 bg-[var(--primary-color)] py-[10px] rounded-[0.65rem] text-white font-bold opacity-80 ${
        disabled ? '' : 'hover:opacity-100'
      } tracking-wider ${widthClassName} ${className}`}
    >
      <span>{message}</span>
      <img
        className="block w-7 h-7 object-cover object-center"
        src="/small-round-play-button.png"
        alt="play-icon"
      />
    </button>
  );
};

ButtonPlay.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  widthType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonPlay;
