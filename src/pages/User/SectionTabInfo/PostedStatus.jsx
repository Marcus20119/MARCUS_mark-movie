import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { LikeAndDislike } from '~/components/Status';
import { convertDate } from '~/helpers';
import { useModal } from '~/hooks';
import { supabase } from '~/supabase';
import { getBucketURL } from '~/supabase/bucketURL';
import { errorToast, loadingAlert, successAlert } from '~/utils';
import ModalEditStatus from './ModalEditStatus';
import './PostedStatus.scss';

const PostedStatus = ({ status, likesTable, handleForceRerender }) => {
  const [forceDisableDelete, setForceDisableDelete] = useState(false);
  const handleDeleteStatus = async id => {
    try {
      setForceDisableDelete(true);
      await Swal.fire({
        title: 'Are you sure?',
        text: `This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF3D71',
        cancelButtonColor: '#cccccc30',
        confirmButtonText: 'Delete it!',
        scrollbarPadding: false,
      }).then(async result => {
        if (result.isConfirmed) {
          loadingAlert();
          const { error } = await supabase
            .from(`statuses`)
            .delete()
            .match({ id });
          if (error) {
            errorToast('Error: ', error.message);
            console.error(error);
          }
          handleForceRerender();
          await successAlert({
            title: 'Deleted Successfully!',
            text: 'Your status has been deleted.',
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisableDelete(false);
    }
  };
  const {
    show: showModelEditStatus,
    handleShow: handleShowModelEditStatus,
    handleHide: handleHideModelEditStatus,
  } = useModal();
  return (
    <Fragment>
      <div className="group relative flex flex-col gap-2 w-full p-3 bg-mainSection rounded-lg hover:-translate-y-3 duration-500">
        <div className="flex justify-between items-start w-full">
          <div className="inline-flex items-center gap-2">
            <img
              src={
                status?.user_avatar
                  ? getBucketURL('avatars', status.user_avatar)
                  : '/imgs/no-face.jpg'
              }
              alt={status?.user_avatar ? 'Avatar' : 'No image'}
              className="block w-[40px] h-[40px] rounded-full overflow-hidden object-cover object-center"
            />
            <div className="flex flex-col justify-between py-[1px]  text-white80">
              <h4 className="text-lg font-bold">{status.user_name}</h4>
              <span className="text-sm italic opacity-70">
                {convertDate(status.created_at, 'tz')}
              </span>
            </div>
          </div>
          <LikeAndDislike likesTable={likesTable} status={status} />
        </div>
        <p className="text-white80">{status.content}</p>
        <div className="absolute top-[calc(100%-0.5rem)] left-0 hidden w-full max-h-0 rounded-b-lg overflow-hidden increase-status group-hover:block">
          <div className="flex justify-between w-full ">
            <button
              className="text-center tracking-wider font-bold text-white80 w-1/2 pt-[0.75rem] pb-1 pl-2 rounded-bl-lg !bg-primary opacity-80 hover:opacity-100"
              onClick={handleShowModelEditStatus}
            >
              EDIT
            </button>
            <button
              className="text-center tracking-wider font-bold text-white80 w-1/2 pt-[0.75rem] pb-1 pr-2 rounded-br-lg !bg-primary  opacity-80 hover:opacity-100"
              onClick={() => handleDeleteStatus(status.id)}
              disabled={forceDisableDelete}
            >
              DELETE
            </button>
          </div>
        </div>
        <div className="absolute top-[calc(100%-0.75rem)] left-0 hidden w-full h-0 border-b-[0.75rem] border-b-mainSection rounded-b-lg group-hover:block">
          &nbsp;
        </div>
      </div>
      <ModalEditStatus
        status={status}
        showModelEditStatus={showModelEditStatus}
        handleHideModelEditStatus={handleHideModelEditStatus}
        handleForceRerender={handleForceRerender}
      />
    </Fragment>
  );
};

export default PostedStatus;
