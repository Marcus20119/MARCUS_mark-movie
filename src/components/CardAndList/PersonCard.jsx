import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { api, route } from '~/utils';
import { ProgressiveImgCustom } from '../Base/ProgressiveImg';
import { useResponsive } from '~/hooks';

const PersonCard = ({ personData, children, alternativeId }) => {
  const { isLaptop } = useResponsive();
  return (
    <Link
      to={route.toDetail('person', alternativeId || personData.id)}
      className="group w-full cursor-pointer rounded-md"
    >
      <div
        className={`group relative w-full h-0 bg-transparent pt-[145%] rounded-md overflow-hidden imgMobile ${
          isLaptop && 'group-hover:-translate-y-2'
        }`}
      >
        {personData?.profile_path ? (
          <ProgressiveImgCustom
            src={api.getPoster(personData.profile_path, 'h632')}
            placeholderSrc={api.getPoster(personData.profile_path, 'w45')}
            alt={personData.profile_path}
          />
        ) : (
          <img
            className="absolute inset-0 block w-full h-full object-cover object-center"
            src="/imgs/no-user.png"
            alt="no-poster"
          />
        )}
        {children}
      </div>
      <h6 className="text-center text-white my-[10px] text-[1.1rem]">
        {personData.name}
      </h6>
    </Link>
  );
};

PersonCard.propTypes = {
  personData: PropTypes.object.isRequired,
};

export default PersonCard;
