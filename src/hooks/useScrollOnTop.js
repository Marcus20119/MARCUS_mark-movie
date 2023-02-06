import { useEffect } from 'react';

/**
 * @param {variable} rerenderCondition - condition for re-rendering
 * @param {number} - optional/default = 0
 */

export function useScrollOnTop(rerenderCondition = 'nothing', toPosition = 0) {
  useEffect(() => {
    document.documentElement.scrollTop = toPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderCondition]);
}
