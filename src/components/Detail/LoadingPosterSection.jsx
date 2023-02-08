import LoadingSkeleton from '../Base/Loading/Skeleton';
import { ButtonPlay } from '../Button';

const LoadingPosterSection = () => {
  return (
    <div className="flex flex-col gap-[20px] w-[20%]">
      <LoadingSkeleton className="w-full h-[356px] rounded-md !bg-mainSection" />
      <ButtonPlay
        message="Watch now"
        displayIcon={true}
        widthType="full"
        className="!rounded-md"
      />
    </div>
  );
};

export { LoadingPosterSection };
