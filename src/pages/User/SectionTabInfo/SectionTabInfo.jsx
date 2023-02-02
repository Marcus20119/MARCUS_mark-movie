import { useState } from 'react';
import Swal from 'sweetalert2';
import { ButtonPrimary } from '~/components/Button';
import { convertDate } from '~/helpers';
import { supabase, useFetchAllTable } from '~/supabase';
import { getBucketURL } from '~/supabase/bucketURL';
import { loadingAlert, successAlert } from '~/utils';
import IntroPart from './IntroPart';
import PostedStatus from './PostedStatus';
import StatusInputPart from './StatusInputPart';

const SectionTabInfo = ({ userRow }) => {
  const [content, setContent] = useState('');
  const [forceRerender, setForceRerender] = useState(false);

  // const handleAddPost = async e => {
  //   e.preventDefault();
  //   try {
  //     await Swal.fire({
  //       title: 'Are you sure?',
  //       text: `Your status will appear in Community Section!`,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#FF3D71',
  //       cancelButtonColor: '#cccccc30',
  //       confirmButtonText: 'Post it!',
  //       scrollbarPadding: false,
  //     }).then(async result => {
  //       if (result.isConfirmed) {
  //         loadingAlert();
  //         await supabase.from('statuses').upsert({
  //           user_id: userRow.id,
  //           user_name: userRow.username,
  //           user_avatar: userRow.avatar_url,
  //           like_count: 0,
  //           dislike_count: 0,
  //           content: content,
  //           created_at: new Date(),
  //         });
  //         setContent('');
  //         setForceRerender(!forceRerender);
  //         await successAlert({
  //           title: 'Posted Successfully!',
  //           text: 'Your status has been posted.',
  //         });
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        <div className="flex flex-col gap-[30px] w-full">
          {!loadingStatusesTable &&
            statusesTable?.length &&
            statusesTable.length > 0 &&
            statusesTable.map((status, index) => (
              <PostedStatus
                key={`status-${index}`}
                status={status}
              ></PostedStatus>
            ))}
        </div>
      </div>
    </div>
  );
};

export { SectionTabInfo };
