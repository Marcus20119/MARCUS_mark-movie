import { useEffect } from 'react';

export default function useScrollOnTop() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
}
