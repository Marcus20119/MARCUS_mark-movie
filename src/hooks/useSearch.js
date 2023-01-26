import debounce from 'lodash.debounce';
import { useState } from 'react';

export function useSearch() {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');
  const handleSetInput = debounce(e => {
    setInput(e.target.value);
  }, 300);
  return {
    input,
    handleSetInput,
    isFocus,
    setIsFocus,
  };
}
