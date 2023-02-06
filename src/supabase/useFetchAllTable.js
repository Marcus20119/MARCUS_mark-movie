import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { supabase } from './supabase';

/**
 *
 * @param {string} table - required (table name)
 * @param {boolean} neededLogin - optional/default = false
 * @param {object} match conditions - optional/default = {}
 * @param {boolean} initialLoading - optional/default = false
 * @param {string} orderBy - optional/default = created_at
 * @param {boolean} orderAsc - optional/default = false
 * @param {number} limit - optional/default = 999
 * @param {Array} rerenderCondition - optional/default = []
 * @returns
 */

export function useFetchAllTable({
  table,
  neededLogIn = false,
  match = {},
  initialLoading = false,
  orderBy = 'created_at',
  orderAsc = false,
  limit = 999,
  rerenderCondition = [],
}) {
  const [tableData, setTableData] = useState([]);
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
              .limit(limit)
              .match(match);
          } else {
            response = await supabase
              .from(table)
              .select()
              .order(orderBy, { ascending: orderAsc })
              .limit(limit);
          }

          const { data, error, status } = response;

          if (error && status !== 406) {
            throw error;
          }
          if (data) {
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
  }, [...rerenderCondition]);

  return { tableData, loading, setTableData, setLoading };
}
