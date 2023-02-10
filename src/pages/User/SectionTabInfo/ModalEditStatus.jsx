/* eslint-disable no-labels */
import { useState } from 'react';
import ModalBase from '~/components/Base/ModalBase';
import { ButtonPrimary } from '~/components/Button';
import { convertDate } from '~/helpers';
import { supabase } from '~/supabase';
import { getBucketURL } from '~/supabase/bucketURL';
import { errorToast, successToast } from '~/utils';

const ModalEditStatus = ({
  showModelEditStatus,
  handleHideModelEditStatus,
  handleForceRerender,
  status,
}) => {
  const [newContent, setNewContent] = useState(status.content);
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleUpdateStatus = () => {
    const handleUpsertData = async () => {
      block: try {
        setUpdateLoading(true);
        const { error } = await supabase
          .from('statuses')
          .upsert({ ...status, content: newContent });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
        handleForceRerender();
        successToast('Successfully update your status!');
      } catch (err) {
        console.log(err);
      } finally {
        setUpdateLoading(false);
        handleHideModelEditStatus();
      }
    };
    handleUpsertData();
  };
  return (
    <ModalBase
      visible={showModelEditStatus}
      onClose={handleHideModelEditStatus}
    >
      <div className="relative w-[600px] bg-[#181818] px-12 py-[40px] rounded-2xl z-2 transition-all float-border">
        <div className="flex flex-col gap-3 w-full">
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
          </div>
          <textarea
            name="status"
            placeholder="What's on your mind?"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            className="textarea-scrollbar w-full min-h-[150px] bg-white80 rounded-md px-[12px] py-[6px] text-mainSection"
          />
          <ButtonPrimary
            className="flex-1 px-3 py-2 rounded-lg font-normal"
            onClick={handleUpdateStatus}
            disabled={updateLoading}
          >
            <span>Update Status</span>
          </ButtonPrimary>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEditStatus;
