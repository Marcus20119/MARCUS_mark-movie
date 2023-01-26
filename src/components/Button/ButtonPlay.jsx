import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ButtonPlay = ({
  type = 'button',
  className = '',
  message = '',
  widthType = 'full',
  disabled = false,
  displayIcon = true,
  isLink = false,
  path = '/',
  onClick = () => {},
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
    <Fragment>
      {isLink ? (
        <Link
          to={path}
          onClick={onClick}
          className={`flex justify-center items-center gap-2 bg-[var(--primary-color)] py-[10px] rounded-[0.65rem] text-white font-bold opacity-80 ${
            disabled ? '' : 'hover:opacity-100'
          } tracking-wider ${widthClassName} ${className}`}
        >
          <span>{message}</span>
          {displayIcon && (
            <img
              className="block w-7 h-7 object-cover object-center"
              src="/imgs/small-round-play-button.png"
              alt="play-icon"
            />
          )}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`flex justify-center items-center gap-2 bg-[var(--primary-color)] py-[10px] rounded-[0.65rem] text-white font-bold opacity-80 ${
            disabled ? '' : 'hover:opacity-100'
          } tracking-wider ${widthClassName} ${className}`}
        >
          <span>{message}</span>
          {displayIcon && (
            <img
              className="block w-7 h-7 object-cover object-center"
              src="/imgs/small-round-play-button.png"
              alt="play-icon"
            />
          )}
        </button>
      )}
    </Fragment>
  );
};

ButtonPlay.propTypes = {
  message: PropTypes.string.isRequired,
  widthType: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  displayIcon: PropTypes.bool,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  path: PropTypes.string,
};

export { ButtonPlay };
