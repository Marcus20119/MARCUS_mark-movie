/* eslint-disable no-labels */
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { ButtonMinus } from '~/components/Button';
import { supabase, useFetchAllTable } from '~/supabase';
import { api, errorToast, route, successToast } from '~/utils';

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
            {tableData.map((actorData, index) => (
              <Link
                key={`favoriteCardKey-${index}`}
                to={route.toDetail('person', actorData.actor_id)}
                className="group w-full cursor-pointer rounded-md"
              >
                <div className="group relative w-full h-0 bg-[#ffffff50] pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
                  <img
                    className="absolute inset-0 block w-full h-full object-cover object-center"
                    src={
                      actorData.profile_path
                        ? api.getPoster(actorData.profile_path)
                        : '/imgs/no-user.png'
                    }
                    alt={actorData.profile_path}
                  />
                  <div className="absolute top-[5%] right-[5%] hidden group-hover:block">
                    <ToolTipBase tipMessage="Remove from favorite list">
                      <ButtonMinus
                        padding={12}
                        iconSize={16}
                        buttonClass="!rounded-md"
                        onClick={e => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleRemoveFromFavoriteList(actorData.id);
                        }}
                        disabled={forceDisable}
                      />
                    </ToolTipBase>
                  </div>
                </div>
                <h6 className="text-center text-white my-[10px] text-[1.1rem]">
                  {actorData.name}
                </h6>
              </Link>
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
