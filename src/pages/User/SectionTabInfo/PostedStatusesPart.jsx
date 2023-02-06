import { Fragment } from 'react';
import { useUser } from '~/contexts/userContext';
import PostedStatus from './PostedStatus';
import PostedStatusesLoading from './PostedStatusesLoading';

const PostedStatusesPart = ({ statusesTable }) => {
  const { likesTable, loadingLikesTable } = useUser();

  return (
    <Fragment>
      {!loadingLikesTable &&
        statusesTable.map((status, index) => (
          <PostedStatus
            key={`status-${index}`}
            status={status}
            likesTable={likesTable}
          ></PostedStatus>
        ))}
      {loadingLikesTable && <PostedStatusesLoading />}
    </Fragment>
  );
};

export default PostedStatusesPart;
