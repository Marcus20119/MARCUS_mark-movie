import { Fragment } from 'react';
import PropTypes from 'prop-types';

import ButtonPlus from '~/components/Common/Button/Plus';
import MovieTagList from '~/components/Common/Movie/TagList';

const DetailMainContent = ({ movieData }) => {
  return (
    <Fragment>
      {movieData && movieData.title && (
        <Fragment>
          <h1
            className={`text-5xl font-merri mb-2 ${
              movieData.tagline ? 'line-clamp-1' : 'line-clamp-2'
            }`}
          >
            {movieData.title}
          </h1>
          <h3 className="text-lg text-[#b5b5b5] mb-[28px] line-clamp-1">
            {movieData.tagline}
          </h3>
          <h4 className="mt-auto mb-[12px]">
            {movieData.runtime < 60
              ? `${movieData.runtime} mins`
              : `${Math.floor(movieData.runtime / 60)} h ${
                  movieData.runtime % 60
                } mins`}
          </h4>
          <div className="flex justify-start items-center gap-2 h-[20px] mb-[16px]">
            <img
              className="block h-full object-contain object-center"
              src="/IMDb.png"
              alt="IMDb"
            />
            <span className="font-semibold">
              {parseFloat(movieData.vote_average).toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full mb-[8px]">
            <div className="inline-flex justify-start items-center gap-[12px]">
              <button className="inline-flex justify-start items-center gap-[10px] bg-[#3E56C4] px-[16px] py-[8px] rounded-md">
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
            <MovieTagList movieData={movieData} className="!mb-0" />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DetailMainContent.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default DetailMainContent;
