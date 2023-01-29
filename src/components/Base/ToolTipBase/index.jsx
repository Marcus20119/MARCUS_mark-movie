import { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './ToolTipBase.scss';
import PortalWrapper from '../PortalWrapper';

const ToolTipBase = ({
  tipMessage = '',
  className = '',
  tipClassName = 'bg-[#D0D0D0] px-4 py-[6px] rounded-lg text-black',
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
      >
        {children}
      </span>
      <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
        <PortalWrapper
          containerClassName="z-[777]"
          bodyClassName={`content absolute inline-block text-center -translate-y-full -translate-x-2/4 z-[777] ${tipClassName}`}
          bodyStyle={{
            maxWidth: '300px',
            top: coords.top - 15 + window.scrollY,
            left: coords.left + coords.width / 2 + window.scrollX,
          }}
          displayCloseButton={false}
        >
          {tipMessage}
          <div className="absolute bottom-0 left-2/4 -translate-x-2/4 translate-y-[6px] border-[12px] border-b-[#D0D0D0] border-r-[#D0D0D0] border-t-transparent border-l-transparent rounded-[4px] rotate-45"></div>
        </PortalWrapper>
      </CSSTransition>
    </Fragment>
  );
};

ToolTipBase.propTypes = {
  tipMessage: PropTypes.string.isRequired,
  className: PropTypes.string,
  tipClassName: PropTypes.string,
};

export default memo(ToolTipBase);
