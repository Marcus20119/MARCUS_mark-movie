import { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './ToolTipBase.scss';
import PortalWrapper from '../PortalWrapper';

const ToolTipBase = ({
  tipMessage = '',
  className = '',
  tipClassName = 'bg-[#D0D0D0] px-4 py-[6px] rounded-lg text-black',
  position = 'top',
  moveUp = 0,
  moveDown = 0,
  children,
}) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({});
  const handleMouseEnter = e => {
    setCoords(e.target.getBoundingClientRect());
    setShow(true);
  };
  const handleMouseLeave = e => {
    setShow(false);
  };
  return (
    <Fragment>
      <span
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
      >
        {children}
      </span>
      <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
        <PortalWrapper
          containerClassName="z-[777]"
          bodyClassName={`content absolute inline-block text-center z-[777] ${tipClassName}`}
          bodyStyle={
            position === 'top'
              ? {
                  maxWidth: '300px',
                  top: coords.top - 15 + window.scrollY - moveUp + moveDown,
                  left: coords.left + coords.width / 2 + window.scrollX,
                  transform: 'translate(-50%, -100%)',
                }
              : {
                  maxWidth: '300px',
                  top: coords.top + 16 + window.scrollY - moveUp + moveDown,
                  left: coords.left + coords.width / 2 + window.scrollX,
                  transform: 'translate(-50%, 100%)',
                }
          }
          displayCloseButton={false}
        >
          {tipMessage}
          {position === 'top' && (
            <div className="absolute bottom-0 left-2/4 -translate-x-2/4 translate-y-[6px] border-[12px] border-b-[#D0D0D0] border-r-[#D0D0D0] border-t-transparent border-l-transparent rounded-[4px] rotate-45"></div>
          )}
          {position === 'bottom' && (
            <div className="absolute top-0 left-2/4 -translate-x-2/4 -translate-y-[6px] border-[12px] border-t-[#D0D0D0] border-l-[#D0D0D0] border-b-transparent border-r-transparent rounded-[4px] rotate-45"></div>
          )}
        </PortalWrapper>
      </CSSTransition>
    </Fragment>
  );
};

ToolTipBase.propTypes = {
  tipMessage: PropTypes.string,
  className: PropTypes.string,
  tipClassName: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  moveUp: PropTypes.number,
  moveDown: PropTypes.number,
};

export default memo(ToolTipBase);
