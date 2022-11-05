import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { api } from '~/config';
import { Link } from 'react-router-dom';
import { route } from '~/config/configRoute';

const CastItem = ({ castData }) => {
  return (
    <Fragment>
      {castData.original_name && (
        <div className="flex flex-col w-full justify-center items-center gap-[6px]">
          <div className="w-[70%]">
            <Link
              to={route.toDetail('person', castData.id)}
              className="relative block w-full pt-[100%] h-0"
            >
              <img
                className="absolute inset-0 block w-full h-full rounded-full object-cover brightness-85 border-[2px] border-solid border-[#222222] hover:border-[var(--primary-color)] cursor-pointer"
                src={
                  castData.profile_path
                    ? api.getPoster(castData.profile_path)
                    : '/no-face.jpg'
                }
                alt={castData.original_name}
              />
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
