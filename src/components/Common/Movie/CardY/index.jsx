import PropTypes from 'prop-types';
import ButtonPrimary from '../../Button/Primary';

const MovieCardY = ({ movieData }) => {
  const { title, poster_path, release_date, vote_average } = movieData;
  const imgLink = `https://image.tmdb.org/t/p/w500${poster_path}`;
  return (
    <div className="flex flex-col gap-[10px] w-full p-[10px] rounded-xl bg-[rgba(255,_255,_255,_0.08)] text-white">
      <div className="relative w-full pt-full rounded-lg overflow-hidden">
        <img
          className="absolute w-full inset-0 block object-cover object-center"
          src={imgLink}
          alt=""
        />
      </div>
      <h5 className="font-bold line-clamp-1 mb-1">{title}</h5>
      <div className="flex justify-between items-center text-xs mb-2">
        <span>{new Date(release_date).getFullYear()}</span>
        <div className="inline-flex gap-1">
          <span>{vote_average}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"
              fill="#FFAA01"
            ></path>
          </svg>
        </div>
      </div>
      <ButtonPrimary>
        <span>Watch now</span>
        <img
          className="block w-7 h-7 object-cover object-center"
          src="/small-round-play-button.png"
          alt="play-icon"
        />
      </ButtonPrimary>
    </div>
  );
};

MovieCardY.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default MovieCardY;
