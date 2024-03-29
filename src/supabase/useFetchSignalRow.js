import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { supabase } from './supabase';

/**
 *
 * @param {string} table - required (table name)
 * @param {boolean} neededLogin - optional/default = false
 * @param {object} match conditions - optional/default = {}
 * @param {boolean} initialLoading - optional/default = false
 * @param {Array} rerenderCondition - optional/default = []
 * @returns
 */

export function useFetchSingleRow({
  table,
  neededLogIn = false,
  match = {},
  initialLoading = false,
  rerenderCondition = [],
}) {
  const [rowData, setTableData] = useState({});
  const [loading, setLoading] = useState(initialLoading);
  const { session } = useAuth();

  useEffect(() => {
    const fetchTableData = async () => {
      if (table) {
        try {
          setLoading(true);
          let response;
          // Dùng single sẽ trả về object, nhưng lại báo lỗi 406, không dùng thì trả về mảng
          if (match) {
            response = await supabase.from(table).select().match(match);
          } else {
            response = await supabase.from(table).select();
          }

          const { data, error, status } = response;

          if (error && status !== 406) {
            console.log(error);
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

  return { rowData, loading, setLoading };
}
