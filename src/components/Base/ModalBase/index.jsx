import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import PortalWrapper from '../PortalWrapper';
import './ModalBase.scss';

const ModalBase = ({ visible, onClose, children }) => {
  return (
    <Fragment>
      <CSSTransition in={visible} timeout={500} classNames="zoom" unmountOnExit>
        {status => (
          <PortalWrapper
            onClose={onClose}
            containerClassName="fixed inset-0 flex justify-center items-center z-[666]"
            bodyClassName="content relative z-[666]"
            overlay
          >
            {children}
          </PortalWrapper>
        )}
      </CSSTransition>
    </Fragment>
  );
};

ModalBase.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default memo(ModalBase);
