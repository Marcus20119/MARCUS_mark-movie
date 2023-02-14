import { useResponsive } from '~/hooks';
import LoadingSkeleton from '../Base/Loading/Skeleton';
import { ButtonPlay } from '../Button';

const LoadingPosterSection = () => {
  const { isTablet, isLaptop } = useResponsive();
  return (
    <div
      className={`flex flex-col gap-[20px] ${isLaptop ? 'w-[20%]' : 'w-[40%]'}`}
    >
      <LoadingSkeleton
        className={`w-full rounded-md !bg-mainSection ${
          isLaptop && 'h-[410px]'
        } ${isTablet && 'h-[365px]'}`}
      />
      <ButtonPlay
        message="Watch now"
        displayIcon={true}
        widthType="full"
        className={`!rounded-md ${isLaptop && '!text-lg'} ${
          !isLaptop && 'py-3 text-xl'
        }`}
      />
    </div>
  );
};

export { LoadingPosterSection };
