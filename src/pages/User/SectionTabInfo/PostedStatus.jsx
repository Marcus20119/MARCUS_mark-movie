import { Fragment, useState } from 'react';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import { useUser } from '~/contexts/userContext';
import { convertDate } from '~/helpers';
import { getBucketURL } from '~/supabase/bucketURL';

const PostedStatus = ({ status }) => {
  const { likesTable, loadingLikesTable, setForceGetLikes } = useUser();
  const [quantityLike, setQuantityLike] = useState(status.like_count);
  const [quantityDislike, setQuantityDislike] = useState(status.dislike_count);
  return (
    <div className="flex flex-col gap-2 w-full p-3 bg-mainSection rounded-lg">
      <div className="flex justify-between w-full">
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
        <div className="inline-flex items-center gap-2 !text-primary text-[22px]">
          {loadingLikesTable && (
            <Fragment>
              <button className="flex items-center gap-2 border-r !border-r-[#cccccc50] pr-2">
                <i className="flex justify-center items-center bx bx-like"></i>
                <LoadingSkeleton className="h-[1rem] w-3 rounded-[3px]" />
              </button>
              <button className="flex items-center gap-2">
                <i className="flex justify-center items-center bx bx-dislike"></i>
                <LoadingSkeleton className="h-[1rem] w-3 rounded-[3px]" />
              </button>
            </Fragment>
          )}
          {!loadingLikesTable && (
            <Fragment>
              <div className="flex items-center gap-2 border-r !border-r-[#cccccc50] pr-2">
                <button>
                  {likesTable.find(
                    item =>
                      item.status_id === status.id && item.like_status === 1
                  ) ? (
                    <i className="flex justify-center items-center bx bxs-like"></i>
                  ) : (
                    <i className="flex justify-center items-center bx bx-like"></i>
                  )}
                </button>
                <span className="text-base text-white80">{quantityLike}</span>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  {likesTable.find(
                    item =>
                      item.status_id === status.id && item.like_status === -1
                  ) ? (
                    <i className="flex justify-center items-center bx bxs-dislike"></i>
                  ) : (
                    <i className="flex justify-center items-center bx bx-dislike"></i>
                  )}
                </button>
                <span className="text-base text-white80">
                  {quantityDislike}
                </span>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <p className="text-white80">{status.content}</p>
    </div>
  );
};

export default PostedStatus;
