import { Fragment } from 'react';
import { useUser } from '~/contexts/userContext';
import PostedStatus from './PostedStatus';

const PostedStatuses = ({ statusesTable, userRow }) => {
  const { likesTable, loadingLikesTable, handleForceGetLikes } = useUser();

  return (
    <div className="flex flex-col gap-[20px] w-full">
      {!loadingLikesTable &&
        statusesTable.map((status, index) => (
          <PostedStatus
            key={`status-${index}`}
            status={status}
            likesTable={likesTable}
            handleForceGetLikes={handleForceGetLikes}
            userRow={userRow}
          ></PostedStatus>
        ))}
      ;
    </div>
  );
};

export default PostedStatuses;
