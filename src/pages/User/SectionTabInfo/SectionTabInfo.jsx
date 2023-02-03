import { useState } from 'react';
import { useFetchAllTable } from '~/supabase';
import IntroPart from './IntroPart';
import PostedStatuses from './PostedStatuses';
import StatusInputPart from './StatusInputPart';

const SectionTabInfo = ({ userRow }) => {
  const [forceRerender, setForceRerender] = useState(false);

  const { tableData: statusesTable, loading: loadingStatusesTable } =
    useFetchAllTable({
      table: 'statuses',
      neededLogIn: true,
      match: { user_id: userRow.id },
      rerenderCondition: [forceRerender],
      initialLoading: true,
    });

  return (
    <div className="flex items-start gap-[30px] ">
      <IntroPart userRow={userRow} />

      <div className="flex-1 flex flex-col gap-[30px] w-full ">
        <StatusInputPart
          userRow={userRow}
          forceRerender={forceRerender}
          setForceRerender={setForceRerender}
        />

        {!loadingStatusesTable &&
          statusesTable?.length &&
          statusesTable.length > 0 && (
            <PostedStatuses statusesTable={statusesTable} userRow={userRow} />
          )}
      </div>
    </div>
  );
};

export { SectionTabInfo };
