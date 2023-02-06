import { useEffect } from 'react';

export function useChangeTitleWebsite({ title = '', rerenderCondition = [] }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...rerenderCondition]);
}
