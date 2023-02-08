import { Fragment } from 'react';
import LoadingSkeleton from '../Base/Loading/Skeleton';
import { ButtonPlus } from '../Button';

const LoadingContentSection = () => {
  return (
    <div className="flex-1 flex flex-col justify-between items-start text-white">
      <div className="flex flex-col h-[250px] w-full pb-[10px]">
        <Fragment>
          <LoadingSkeleton className="h-[3rem] my-[0.35rem] w-[400px] rounded-md opacity-60" />
          <LoadingSkeleton className="h-[1.125rem] mb-[calc(28px_+_0.3125rem)]  mt-[0.5632rem] w-[300px] rounded-md opacity-60" />
          <LoadingSkeleton className="h-[16px] mb-[calc(12px_+_1.6px)] mt-[7.2px] w-[150px] rounded-md opacity-60" />
          <div
            className={`flex justify-start items-center gap-2 h-[20px] mb-[16px] `}
          >
            <img
              className="block h-full object-contain object-center"
              src="/imgs/IMDb.png"
              alt="IMDb"
            />
            <LoadingSkeleton className="h-[16px] mx-[4px] w-[30px] rounded-md opacity-60" />
          </div>
          <div className="flex justify-between items-center w-full mb-[8px]">
            <div className="inline-flex justify-start items-center gap-[12px]">
              <button className="inline-flex justify-start items-center gap-[10px] bg-[#3E56C4] px-[16px] py-[8px] rounded-md opacity-90 hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                </svg>
                <span>Share</span>
              </button>
              <ButtonPlus
                padding={12}
                iconSize={16}
                buttonClass="!rounded-md"
              />
            </div>
          </div>
        </Fragment>
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <Fragment>
          <div className="inline-flex justify-start items-center gap-[20px] my-[24px]">
            <div className="flex flex-col gap-[8px]">
              {['PRODUCTION COMPANY', 'COUNTRIES', 'RELEASE DATE'].map(
                (item, index) => (
                  <span key={`subInfoTitle${index}`} className="text-[#7A7A7A]">
                    {item}
                  </span>
                )
              )}
            </div>
            <div className="flex flex-col gap-[8px]">
              {Array(3)
                .fill('')
                .map((item, index) => (
                  <LoadingSkeleton
                    key={`subInfoContent${index}`}
                    className="h-[16px] my-[4px] w-[180px] rounded-md opacity-60"
                  />
                ))}
            </div>
          </div>
          <LoadingSkeleton className="w-full h-[50px] rounded-md opacity-40" />
        </Fragment>
      </div>
    </div>
  );
};

export default LoadingContentSection;
