import { useEffect } from 'react';
import { useState } from 'react';

/**
 * @param {Array} rerenderCondition
 */

export function useForceRerender(rerenderCondition = []) {
  const [forceRerender, setForceRerender] = useState(false);
  useEffect(() => {
    setForceRerender(!forceRerender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...rerenderCondition]);
}
