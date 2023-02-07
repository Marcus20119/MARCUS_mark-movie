import { useCallback, useEffect, useRef, useState } from 'react';

export const useDetectScrolledToBottom = ({ type = 'node' }) => {
  const [isBottom, setIsBottom] = useState(false);
  const nodeRef = useRef();
  const handleScrollNode = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = nodeRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, [nodeRef]);
  const handleScrollWindow = useCallback(() => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, []);
  useEffect(() => {
    if (type === 'node') {
      if (nodeRef.current) {
        const nodeRefCurrent = nodeRef.current;
        nodeRefCurrent.addEventListener('scroll', handleScrollNode);
        return () =>
          nodeRefCurrent.removeEventListener('scroll', handleScrollNode);
      }
    }
    if (type === 'window') {
      window.addEventListener('scroll', handleScrollWindow);
      return () => window.removeEventListener('scroll', handleScrollWindow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeRef.current]);
  return { isBottom, nodeRef, setIsBottom };
};
