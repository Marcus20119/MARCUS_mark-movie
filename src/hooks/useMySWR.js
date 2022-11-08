import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config';

export default function useMySWR({ api, max = '', origin = false }) {
  const [myData, setMyData] = useState([]);
  const { data, error } = useSWR(api, fetcher);
  useEffect(() => {
    if (origin) {
      if (data) {
        setMyData(data);
      }
    } else {
      if (data && data.genres) {
        setMyData(data.genres);
      }
      if (data && data.results) {
        if (max) {
          setMyData(data.results.slice(0, max));
        } else {
          setMyData(data.results);
        }
      } else if (data && data.id) {
        setMyData(data);
      }
    }
  }, [data, max, origin]);

  return {
    myData,
    isLoading: !data,
    isError: error,
  };
}
