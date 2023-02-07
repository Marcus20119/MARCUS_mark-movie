import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { useDetectScrolledToBottom } from '~/hooks';
import { supabase } from './supabase';

/**
 *
 * @param {string} table - required (table name)
 * @param {boolean} neededLogin - optional/default = false
 * @param {object} match conditions - optional/default = {}
 * @param {boolean} initialLoading - optional/default = false
 * @param {string} orderBy - optional/default = created_at
 * @param {boolean} orderAsc - optional/default = false
 * @param {number} rowPerLoad - optional/default = 10
 * @param {number} limit - optional/default = NaN
 * @param {Array} rerenderCondition - optional/default = []
 * @returns
 */

export function useFetchAllTableInfinity({
  table,
  neededLogIn = false,
  match = {},
  initialLoading = false,
  orderBy = 'created_at',
  orderAsc = false,
  rowPerLoad = 10,
  limit,
  rerenderCondition = [],
}) {
  const [currentLimit, setCurrentLimit] = useState(rowPerLoad);
  const { isBottom } = useDetectScrolledToBottom({ type: 'window' });
  useEffect(() => {
    if (limit && currentLimit < limit && isBottom) {
      setCurrentLimit(prev => prev + rowPerLoad);
    } else if (!limit && isBottom) {
      setCurrentLimit(prev => prev + rowPerLoad);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);
  const [tableData, setTableData] = useState([]);
  const [tableDataInfinity, setDataInfinity] = useState([]);
  const [loading, setLoading] = useState(initialLoading);
  const { session } = useAuth();

  useEffect(() => {
    const fetchTableData = async () => {
      if (table) {
        try {
          setLoading(true);
          let response;
          if (match) {
            response = await supabase
              .from(table)
              .select()
              .order(orderBy, { ascending: orderAsc })
              .limit(currentLimit)
              .match(match);
          } else {
            response = await supabase
              .from(table)
              .select()
              .order(orderBy, { ascending: orderAsc })
              .limit(currentLimit);
          }

          const { data, error, status } = response;

          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            const additionalData = data.slice(-10);
            const newData = [...tableDataInfinity];
            additionalData.forEach(item => newData.push(item));
            setDataInfinity(newData);
            setTableData(data);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    if (neededLogIn) {
      if (session?.user?.id) {
        fetchTableData();
      } else {
        setLoading(false);
      }
    } else {
      fetchTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...rerenderCondition, currentLimit]);

  return { tableData, loading, setTableData, setLoading };
}
