import { Fragment } from 'react';
import { api } from '~/config';

const CastCard = ({ castData }) => {
  console.log('castData', castData);
  return (
    <Fragment>
      {castData.original_name && (
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-[80%]">
            <div className="relative w-full pt-[100%] h-0">
              <img
                className="absolute inset-0 block w-full h-full rounded-full object-cover brightness-75"
                src={
                  castData.profile_path
                    ? api.getPoster(castData.profile_path)
                    : '/no-face.jpg'
                }
                alt={castData.original_name}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CastCard;
