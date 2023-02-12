import debounce from 'lodash.debounce';
import { useState } from 'react';

/**
 *
 * @param {number} delayTime - optional/default = 300
 * @returns
 */

export function useSearch(delayTime = 300) {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');
  const handleSetInput = debounce(e => {
    setInput(e.target.value);
  }, delayTime);
  return {
    input,
    handleSetInput,
    isFocus,
    setIsFocus,
    setInput,
  };
}
