/* eslint-disable no-labels */

import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { ButtonMinus } from '~/components/Button';
import { LoadingMainList } from '~/components/CardAndList';
import FilmCard from '~/components/CardAndList/FilmCard';
import { useAuth } from '~/contexts/authContext';
import { useResponsive } from '~/hooks';
import { supabase, useFetchAllTable } from '~/supabase';
import { errorToast, successToast } from '~/utils';

const WatchlistSection = ({ type }) => {
  const { session } = useAuth();
  const { tableData, loading, setTableData } = useFetchAllTable({
    table: `watchlist_${type}s`,
    neededLogIn: true,
    initialLoading: true,
    match: { user_id: session?.user?.id ? session.user.id : '' },
    rerenderCondition: [session, type],
  });

  const [forceDisable, setForceDisable] = useState(false);
  const handleRemoveFromWatchlist = async id => {
    block: try {
      setForceDisable(true);
      const { error } = await supabase
        .from(`watchlist_${type}s`)
        .delete()
        .match({ id });
      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
        break block;
      }
      setTableData(tableData.filter(item => item.id !== id));
      successToast('Removed from watchlist');
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisable(false);
    }
  };

  const { isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;
  return (
    <Fragment>
      {!loading && !!tableData?.length && tableData.length > 0 && (
        <div className="relative w-full p-[10px]">
          <div
            className="grid gap-[16px] w-full"
            style={{
              gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
            }}
          >
            {tableData.map((filmData, index) => (
              <FilmCard
                key={`favoriteCardKey-${index}`}
                filmData={filmData}
                alternativeId={filmData[`${type}_id`]}
                type={type}
              >
                <div
                  className={`absolute top-[5%] right-[5%] hidden group-hover:block ${
                    !isLaptop && '!block'
                  }`}
                >
                  <ToolTipBase tipMessage="Remove from watchlist">
                    <ButtonMinus
                      padding={12}
                      iconSize={16}
                      buttonClass="!rounded-md"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleRemoveFromWatchlist(filmData.id);
                      }}
                      disabled={forceDisable}
                    />
                  </ToolTipBase>
                </div>
              </FilmCard>
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
          <Link
            to={`/${type}/search?query=&page=1`}
            className="italic !text-primary !underline pl-3 opacity-80 hover:opacity-100"
          >
            Add now
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default WatchlistSection;
