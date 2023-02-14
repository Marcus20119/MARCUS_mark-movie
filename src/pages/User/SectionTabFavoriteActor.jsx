/* eslint-disable no-labels */
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { ButtonMinus } from '~/components/Button';
import PersonCard from '~/components/CardAndList/PersonCard';
import { useResponsive } from '~/hooks';
import { supabase, useFetchAllTable } from '~/supabase';
import { errorToast, successToast } from '~/utils';

const SectionTabFavoriteActor = ({ userRow }) => {
  const { tableData, loading, setTableData } = useFetchAllTable({
    table: `favorite_actors`,
    neededLogIn: true,
    initialLoading: true,
    match: { user_id: userRow.id },
    rerenderCondition: [userRow],
  });

  const [forceDisable, setForceDisable] = useState(false);
  const handleRemoveFromFavoriteList = async id => {
    block: try {
      setForceDisable(true);
      const { error } = await supabase
        .from(`favorite_actors`)
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
  const { isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;
  return (
    <Fragment>
      {!loading && !!tableData && tableData.length > 0 && (
        <div className="relative w-full p-[10px]">
          <div
            className="grid gap-[16px] w-full"
            style={{
              gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
            }}
          >
            {tableData.map((personData, index) => (
              <PersonCard
                key={`favoriteCardKey-${index}`}
                personData={personData}
                alternativeId={personData.actor_id}
              >
                <div
                  className={`absolute top-[5%] right-[5%] hidden group-hover:block ${
                    !isLaptop && '!block'
                  }`}
                >
                  <ToolTipBase tipMessage="Remove from favorite list">
                    <ButtonMinus
                      padding={12}
                      iconSize={16}
                      buttonClass="!rounded-md"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleRemoveFromFavoriteList(personData.id);
                      }}
                      disabled={forceDisable}
                    />
                  </ToolTipBase>
                </div>
              </PersonCard>
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
          <span className="text-white80 italic">
            You still not have any favorite actor
          </span>
          <Link
            to={`/person/search?query=&page=1`}
            className="italic !text-primary !underline pl-3 opacity-80 hover:opacity-100"
          >
            Add now
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SectionTabFavoriteActor;
