import { useUser } from '~/contexts/userContext';
import PostedStatus from './PostedStatus';

const PostedStatuses = ({ statusesTable }) => {
  const { likesTable, loadingLikesTable } = useUser();

  return (
    <div className="flex flex-col gap-[30px] w-full">
      {!loadingLikesTable &&
        statusesTable.map((status, index) => (
          <PostedStatus
            key={`status-${index}`}
            status={status}
            likesTable={likesTable}
          ></PostedStatus>
        ))}
      ;
    </div>
  );
};

export default PostedStatuses;
