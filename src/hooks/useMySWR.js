import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config';

export default function useMySWR({ api, max = '' }) {
  const [myData, setMyData] = useState([]);
  const { data, error } = useSWR(api, fetcher);
  useEffect(() => {
    if (data && data.genres) {
      setMyData(data.genres);
    }
    if (data && data.results) {
      if (max) {
        setMyData(data.results.slice(0, max));
      } else {
        setMyData(data.results);
      }
    }
  }, [data, max]);

  return {
    myData,
    setMyData,
    error,
  };
}
