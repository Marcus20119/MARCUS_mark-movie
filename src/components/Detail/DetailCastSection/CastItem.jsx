import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { api, route } from '~/utils';
import ProgressiveImg from '~/components/Base/ProgressiveImg';

const CastItem = ({ castData }) => {
  return (
    <Fragment>
      {castData.original_name && (
        <div className="flex flex-col w-full justify-center items-center gap-[6px]">
          <div className="w-[70%]">
            <Link
              to={route.toDetail('person', castData.id)}
              className="relative block w-full pt-[100%] h-0 rounded-full overflow-hidden"
            >
              {castData?.profile_path ? (
                <ProgressiveImg
                  src={api.getPoster(castData.profile_path, 'h632')}
                  placeholderSrc={api.getPoster(castData.profile_path, 'w45')}
                  alt={castData.original_name}
                  className="rounded-full object-cover brightness-85 border-[2px] border-solid border-[#222222] hover:!border-primary cursor-pointer"
                />
              ) : (
                <img
                  className="rounded-full absolute inset-0 block w-full h-full object-cover brightness-85 border-[2px] border-solid border-[#222222] hover:!border-primary cursor-pointer"
                  src="/imgs/no-face.jpg"
                  alt="no-poster"
                />
              )}
            </Link>
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

CastItem.propTypes = {
  castData: PropTypes.object.isRequired,
};

export default CastItem;
