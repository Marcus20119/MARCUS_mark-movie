/* eslint-disable no-labels */
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { ButtonMinus } from '~/components/Button';
import FilmCard from '~/components/CardAndList/FilmCard';
import { supabase, useFetchAllTable } from '~/supabase';
import { errorToast, successToast } from '~/utils';

const SectionTabFavoriteFilm = ({ userRow, type }) => {
  const { tableData, loading, setTableData } = useFetchAllTable({
    table: `favorite_${type}s`,
    neededLogIn: true,
    initialLoading: true,
    match: { user_id: userRow.id },
    rerenderCondition: [userRow, type],
  });

  const [forceDisable, setForceDisable] = useState(false);
  const handleRemoveFromFavoriteList = async id => {
    block: try {
      setForceDisable(true);
      const { error } = await supabase
        .from(`favorite_${type}s`)
        .delete()
        .match({ id });
      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
        break block;
      }
      setTableData(tableData.filter(item => item.id !== id));
      successToast('Removed from favorite list');
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisable(false);
    }
  };
  return (
    <Fragment>
      {!loading && !!tableData && tableData.length > 0 && (
        <div className="relative w-full p-[10px]">
          <div
            className="grid gap-[16px] w-full"
            style={{
              gridTemplateColumns: `repeat(5, minmax(0, 1fr))`,
            }}
          >
            {tableData.map((filmData, index) => (
              <FilmCard
                key={`favoriteCardKey-${index}`}
                filmData={filmData}
                alternativeId={filmData[`${type}_id`]}
                type={type}
              >
                <div className="absolute top-[5%] right-[5%] hidden group-hover:block">
                  <ToolTipBase tipMessage="Remove from favorite list">
                    <ButtonMinus
                      padding={12}
                      iconSize={16}
                      buttonClass="!rounded-md"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleRemoveFromFavoriteList(filmData.id);
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
      {loading && (
        <div className="w-full">
          <LoadingBounce />
        </div>
      )}
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

export default SectionTabFavoriteFilm;
