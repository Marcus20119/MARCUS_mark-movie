/* eslint-disable no-labels */

import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { ButtonMinus } from '~/components/Button';
import { LoadingFilmList } from '~/components/CardAndList';
import { useAuth } from '~/contexts/authContext';
import { supabase, useFetchAllTable } from '~/supabase';
import { api, errorToast, route, successToast } from '~/utils';

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

  return (
    <Fragment>
      {!loading && !!tableData?.length && tableData.length > 0 && (
        <div className="relative w-full p-[10px]">
          <div
            className="grid gap-[16px] w-full"
            style={{
              gridTemplateColumns: `repeat(5, minmax(0, 1fr))`,
            }}
          >
            {tableData.map((filmData, index) => (
              <Link
                key={`favoriteCardKey-${index}`}
                to={route.toDetail(type, filmData[`${type}_id`])}
                className="group w-full cursor-pointer rounded-md"
              >
                <div className="group relative w-full h-0 bg-[#ffffff50] pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
                  <img
                    className="absolute inset-0 block w-full h-full object-cover object-center"
                    src={
                      filmData.poster_path
                        ? api.getPoster(filmData.poster_path)
                        : '/imgs/no-poster.jpg'
                    }
                    alt={filmData.poster_path}
                  />
                  <div className="absolute top-[5%] right-[5%] hidden group-hover:block">
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
                </div>
                <h6 className="text-center text-white my-[10px] text-[1.1rem]">
                  {filmData.title || filmData.name}
                </h6>
              </Link>
            ))}
          </div>
        </div>
      )}
      {loading && <LoadingFilmList />}
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
