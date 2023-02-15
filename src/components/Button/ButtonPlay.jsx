import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useResponsive } from '~/hooks';

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
  const { isMobile } = useResponsive();

  let widthClassName = '';
  switch (widthType) {
    case 'full':
      widthClassName = 'w-full';
      break;
    case 'fit':
      widthClassName = !isMobile
        ? 'w-auto py-[0.75rem] px-[2rem]'
        : 'w-auto py-[0.55rem] px-[1.5rem]';
      break;
    default:
      break;
  }
  return (
    <Fragment>
      {isLink ? (
        <HashLink
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
        </HashLink>
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
  type: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  widthType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  displayIcon: PropTypes.bool,
  isLink: PropTypes.bool,
  path: PropTypes.string,
  onClick: PropTypes.func,
};

export { ButtonPlay };
