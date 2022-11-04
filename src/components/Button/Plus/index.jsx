import PropTypes from 'prop-types';

const ButtonPlus = ({
  type = 'button',
  padding = 0,
  iconSize = 20,
  disabled = false,
  buttonClass = '',
}) => {
  const sizeClass = `${iconSize.toString()}px`;
  const paddingClass = `${padding.toString()}px`;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex justify-center items-center bg-[rgba(207,_207,_207,_0.3)] rounded-[0.65rem] opacity-80 ${
        disabled ? '' : 'hover:opacity-100'
      } ${buttonClass}`}
      style={{ padding: `${paddingClass}` }}
    >
      <img
        className={`block ${sizeClass}`}
        src="/plus.png"
        alt="plus button"
        style={{ width: `${sizeClass}`, height: `${sizeClass}` }}
      />
    </button>
  );
};

ButtonPlus.propTypes = {
  type: PropTypes.string,
  padding: PropTypes.number.isRequired,
  iconSize: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  buttonClass: PropTypes.string,
};

export default ButtonPlus;
