import { useEffect } from 'react';

/**
 *
 * @param {variable} rerenderCondition - condition for re-rendering
 */

export default function useScrollOnTop(rerenderCondition = 'nothing') {
  useEffect(() => {
    console.log('kaka');
    document.documentElement.scrollTop = 0;
  }, [rerenderCondition]);
}
