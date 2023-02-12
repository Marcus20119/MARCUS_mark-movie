import { Link } from 'react-router-dom';
import { api, route } from '~/utils';
import ProgressiveImg from '../Base/ProgressiveImg';

const FilmCard = ({ type, filmData, alternativeId, children }) => {
  return (
    <Link
      to={route.toDetail(type, alternativeId || filmData.id)}
      className="group w-full cursor-pointer rounded-md"
    >
      <div className="group relative w-full h-0 bg-transparent pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
        {filmData?.poster_path ? (
          <ProgressiveImg
            src={api.getPoster(filmData.poster_path, 'w500')}
            placeholderSrc={api.getPoster(filmData.poster_path, 'w92')}
            alt={filmData.poster_path}
          />
        ) : (
          <img
            className="absolute inset-0 block w-full h-full object-cover object-center"
            src="/imgs/no-poster.jpg"
            alt="no-poster"
          />
        )}
        <div className="absolute top-[5%] left-[7%] inline-flex items-center gap-1 !bg-primary rounded-full py-1 px-2 text-sm font-bold !text-white80 opacity-70 group-hover:opacity-90">
          <span>{parseFloat(filmData.vote_average).toFixed(1)}</span>
          <i className="bx bxs-star"></i>
        </div>
        {children}
      </div>
      <h6 className="text-center text-white my-[10px] text-[1.1rem]">
        {filmData.title || filmData.name}
      </h6>
    </Link>
  );
};

export default FilmCard;
