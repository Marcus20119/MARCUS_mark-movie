import PropTypes from 'prop-types';

const ButtonMinus = ({
  type = 'button',
  padding = 0,
  iconSize = 20,
  disabled = false,
  buttonClass = '',
  onClick = () => {},
}) => {
  const sizeClass = `${iconSize.toString()}px`;
  const paddingClass = `${padding.toString()}px`;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex justify-center items-center bg-[#534C4E] rounded-[0.65rem] cursor-pointer opacity-70 ${
        disabled ? '' : 'hover:opacity-90'
      } ${buttonClass}`}
      style={{ padding: `${paddingClass}` }}
      onClick={onClick}
    >
      <img
        className={`block ${sizeClass}`}
        src="/imgs/minus.png"
        alt="plus button"
        style={{ width: `${sizeClass}`, height: `${sizeClass}` }}
      />
    </button>
  );
};

ButtonMinus.propTypes = {
  type: PropTypes.string,
  padding: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  buttonClass: PropTypes.string,
};

export { ButtonMinus };
