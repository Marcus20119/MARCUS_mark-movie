import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// create div tag
function createPortalWrapper() {
  const element = document.createElement('div');
  element.id = 'portal-wrapper';
  return element;
}
const portalWrapperEle = createPortalWrapper();

const PortalWrapper = ({
  onClose = () => {},
  overlay = false,
  containerClassName = '',
  bodyClassName = '',
  containerStyle = {},
  bodyStyle = {},
  children,
}) => {
  // append div tag to body
  useEffect(() => {
    document.body.appendChild(portalWrapperEle);
  }, []);
  const renderContent = (
    <div className={containerClassName} style={containerStyle}>
      {overlay && (
        <div
          className="overlay absolute inset-0 bg-[rgba(0,_0,_0,_0.8)] z-[555]"
          onClick={onClose}
        ></div>
      )}
      <div className={bodyClassName} style={bodyStyle}>
        {children}
      </div>
      <i
        className="bx bx-x absolute top-[5%] right-[5%] z-[666] cursor-pointer text-white text-4xl"
        onClick={onClose}
      ></i>
    </div>
  );
  return createPortal(renderContent, portalWrapperEle);
};

PortalWrapper.propTypes = {
  overlay: PropTypes.bool,
  onClose: PropTypes.func,
  containerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
};

export default memo(PortalWrapper);
