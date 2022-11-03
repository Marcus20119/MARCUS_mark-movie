import { useCallback, useState } from 'react';

export default function useModal() {
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => {
    setShow(true);
  }, []);
  const handleHide = useCallback(() => {
    setShow(false);
  }, []);
  return {
    show,
    handleShow,
    handleHide,
  };
}
