import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config';

/**
 *
 * @param {string} api
 * @param {number} max - limit array of data
 * @param {boolean} origin - set = true if you want to get both data and total_pages
 * @returns
 */
export function useMySWR({ api, max = '', origin = false }) {
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
