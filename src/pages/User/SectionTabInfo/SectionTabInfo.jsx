import { useState } from 'react';
import { useFetchAllTable } from '~/supabase';
import FavoritePart from './FavoritePart';
import IntroPart from './IntroPart';
import PostedStatusesLoading from './PostedStatusesLoading';
import PostedStatusesPart from './PostedStatusesPart';
import StatusInputPart from './StatusInputPart';

const SectionTabInfo = ({ userRow }) => {
  const [forceRerender, setForceRerender] = useState(false);
  const handleForceRerender = () => {
    setForceRerender(!forceRerender);
  };

  const { tableData: statusesTable, loading: loadingStatusesTable } =
    useFetchAllTable({
      table: 'statuses',
      neededLogIn: true,
      match: { user_id: userRow.id },
      rerenderCondition: [forceRerender, userRow],
      initialLoading: true,
    });

  return (
    <div className="flex items-start gap-[30px] ">
      <div className="flex flex-col justify-start gap-[30px] w-[35%]">
        <IntroPart userRow={userRow} />
        <FavoritePart type="movie" />
        <FavoritePart type="tv" />
      </div>

      <div className="flex-1 flex flex-col gap-[30px] w-full">
        <StatusInputPart
          userRow={userRow}
          handleForceRerender={handleForceRerender}
        />
        <div className="flex flex-col gap-[30px] w-full">
          {!loadingStatusesTable &&
            !!statusesTable?.length &&
            statusesTable.length > 0 && (
              <PostedStatusesPart
                statusesTable={statusesTable}
                handleForceRerender={handleForceRerender}
              />
            )}
          {loadingStatusesTable && <PostedStatusesLoading />}
        </div>
      </div>
    </div>
  );
};

export { SectionTabInfo };
