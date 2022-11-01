import { Fragment } from 'react';
import { api } from '~/config';

const CastCard = ({ castData }) => {
  return (
    <Fragment>
      {castData.original_name && (
        <div className="flex flex-col w-full justify-center items-center gap-[6px]">
          <div className="w-[70%]">
            <div className="relative w-full pt-[100%] h-0">
              <img
                className="absolute inset-0 block w-full h-full rounded-full object-cover brightness-85 border-[2px] border-solid border-[#222222] hover:border-[var(--primary-color)] cursor-pointer"
                src={
                  castData.profile_path
                    ? api.getPoster(castData.profile_path)
                    : '/no-face.jpg'
                }
                alt={castData.original_name}
              />
            </div>
          </div>
          <div className="px-[4px]">
            <h3 className="font-bold text-center text-white text-sm">
              {castData.name}
            </h3>
            <h4 className="text-[#b5b5b5] text-center text-sm">
              {castData.character}
            </h4>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CastCard;
