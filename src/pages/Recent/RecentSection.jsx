/* eslint-disable no-labels */
import { useEffect } from 'react';
import { Fragment } from 'react';
import { LoadingMainList } from '~/components/CardAndList';
import FilmCard from '~/components/CardAndList/FilmCard';
import { useAuth } from '~/contexts/authContext';
import { useResponsive } from '~/hooks';
import { supabase, useFetchAllTable } from '~/supabase';

const RecentSection = ({ type }) => {
  const { session } = useAuth();
  const { tableData, loading } = useFetchAllTable({
    table: `recent_${type}s`,
    neededLogIn: true,
    initialLoading: true,
    match: { user_id: session?.user?.id ? session.user.id : '' },
    limit: 11,
    orderBy: 'updated_at',
    rerenderCondition: [session, type],
  });
  const handleRemoveFromWatchlist = async id => {
    block: try {
      const { error } = await supabase
        .from(`recent_${type}s`)
        .delete()
        .match({ id });
      if (error) {
        console.error(error);
        break block;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Gọi api 11 row, nếu có row thứ 11 thì xóa row thứ 11 này, cứ thế mỗi lần reload lại xóa lần lần cho đến khi chỉ còn 10 row
  useEffect(() => {
    if (tableData?.[10]) {
      handleRemoveFromWatchlist(tableData[10].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  const { isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;
  return (
    <Fragment>
      {!loading && !!tableData?.length && tableData.length > 0 && (
        <div className="relative w-full py-[10px]">
          <div
            className="grid gap-[16px] w-full"
            style={{
              gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
            }}
          >
            {tableData.slice(0, 10).map((filmData, index) => (
              <FilmCard
                key={`recentCardKey-${index}`}
                filmData={filmData}
                alternativeId={filmData[`${type}_id`]}
                type={type}
              />
            ))}
          </div>
        </div>
      )}
      {loading && <LoadingMainList numberOfRow={isLaptop ? 1 : 2} />}
      {!loading && !!tableData && tableData.length === 0 && (
        <Fragment>
          <span className="text-white80 italic">{`You still not have any ${
            type === 'movie' ? 'Movie' : 'Show'
          } in this section:`}</span>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RecentSection;
