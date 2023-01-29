import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { supabase } from './supabase';

/**
 *
 * @param {string} table - required (table name)
 * @param {boolean} neededLogin - optional/default = false
 * @param {Array} rerenderCondition - optional/default = []
 * @returns
 */

export function useFetchAllTable({
  table,
  neededLogin = false,
  rerenderCondition = [],
}) {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    const fetchTableData = async () => {
      if (table) {
        try {
          setLoading(true);
          let { data, error, status } = await supabase.from(table).select();

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
    if (neededLogin) {
      if (session?.user?.id) {
        fetchTableData();
      }
    } else {
      fetchTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...rerenderCondition]);

  return { tableData, loading };
}
