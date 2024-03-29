import PropTypes from 'prop-types';

import { LikeAndDislike, LoadingLikeAndDislike } from '~/components/Status';
import { convertDate } from '~/helpers';
import { useResponsive } from '~/hooks';
import { getBucketURL } from '~/supabase';

const CommunityStatus = ({ status, likesTable, loadingLikesTable }) => {
  const { isLaptop } = useResponsive();

  return (
    <div
      className={`group relative flex flex-col gap-2 w-full p-3 bg-mainSection rounded-lg duration-500 last-of-type:flex-1 ${
        isLaptop && 'hover:-translate-y-3'
      }`}
    >
      <div className="flex justify-between items-start w-full ">
        <div className="inline-flex items-center gap-2">
          <img
            src={
              status?.user_avatar
                ? getBucketURL('avatars', status.user_avatar)
                : '/imgs/no-face.jpg'
            }
            alt={status?.user_avatar ? 'Avatar' : 'No image'}
            className="block w-[40px] h-[40px] rounded-full overflow-hidden object-cover object-center bg-[#ffffff50]"
          />
          <div className="flex flex-col justify-between py-[1px]  text-white80">
            <h4 className="text-lg font-bold line-clamp-1">
              {status.user_name}
            </h4>
            <span className="text-sm italic opacity-70">
              {convertDate(status.created_at, 'tz')}
            </span>
          </div>
        </div>
        {!loadingLikesTable && (
          <LikeAndDislike likesTable={likesTable} status={status} />
        )}
        {loadingLikesTable && <LoadingLikeAndDislike />}
      </div>
      <p className="text-white80">{status.content}</p>
    </div>
  );
};

CommunityStatus.propTypes = {
  status: PropTypes.object,
  likesTable: PropTypes.array,
  loadingLikesTable: PropTypes.bool,
};

export default CommunityStatus;
