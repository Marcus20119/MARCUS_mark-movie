import { Fragment } from 'react';
import { useUser } from '~/contexts/userContext';
import PostedStatus from './PostedStatus';
import PostedStatusesLoading from './PostedStatusesLoading';

const PostedStatusesPart = ({ statusesTable, handleForceRerender }) => {
  const { likesTable, loadingLikesTable } = useUser();

  return (
    <Fragment>
      {!loadingLikesTable &&
        statusesTable.map((status, index) => (
          <PostedStatus
            key={`status-${index}`}
            status={status}
            likesTable={likesTable}
            handleForceRerender={handleForceRerender}
          ></PostedStatus>
        ))}
      {loadingLikesTable && <PostedStatusesLoading />}
    </Fragment>
  );
};

export default PostedStatusesPart;
