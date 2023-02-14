import { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';

import { ButtonPlus } from '~/components/Button';
import { MovieTagList } from '~/components/CardAndList';
import PlusDropDown from './PlusDropDown';
import { useAuth } from '~/contexts/authContext';
import { neededSignInAlert } from '~/utils';
import { useResponsive } from '~/hooks';

const MainContent = ({ movieData }) => {
  const { pathname } = useLocation();
  const { session, handleShowModelLogIn } = useAuth();
  const facebookRef = useRef();

  const { isTablet, isLaptop } = useResponsive();

  return (
    <Fragment>
      {movieData && (movieData.title || movieData.name) && (
        <Fragment>
          <h1
            className={`text-5xl font-merri mb-0 leading-[3.7rem] ${
              movieData.tagline ? 'line-clamp-1' : 'line-clamp-2'
            } ${isTablet && '!line-clamp-2 mb-4'}`}
          >
            {movieData.title || movieData.name}
          </h1>
          {movieData.tagline && !isTablet && (
            <h3 className="text-lg text-[#b5b5b5] mb-[28px] mt-1 line-clamp-1">
              {movieData.tagline}
            </h3>
          )}
          {movieData.runtime ? (
            <h4 className="mt-auto mb-[12px]">
              {movieData.runtime < 60
                ? `${movieData.runtime} mins`
                : `${Math.floor(movieData.runtime / 60)} h ${
                    movieData.runtime % 60
                  } mins`}
            </h4>
          ) : (
            ''
          )}
          {movieData.number_of_seasons && (
            <h4 className="mt-auto mb-[12px]">
              {movieData.number_of_seasons > 1
                ? `${movieData.number_of_seasons} seasons - ${movieData.number_of_episodes} episodes`
                : `${movieData.number_of_seasons} season - ${movieData.number_of_episodes} episodes`}
            </h4>
          )}
          <div
            className={`flex justify-start items-center gap-2 h-[20px] mb-[16px] ${
              !movieData.runtime && !movieData.number_of_seasons && 'mt-auto'
            }`}
          >
            <img
              className="block h-full object-contain object-center"
              src="/imgs/IMDb.png"
              alt="IMDb"
            />
            <span className="font-semibold">
              {parseFloat(movieData.vote_average).toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full mb-[8px]">
            <div className="inline-flex justify-start items-center gap-[12px]">
              <button
                className={`inline-flex justify-start items-center gap-[10px] bg-[#3E56C4] rounded-md opacity-90 hover:opacity-100 ${
                  isLaptop && 'px-[16px] py-[8px]'
                } ${isTablet && 'px-[20px] py-[12px] text-xl'}`}
                onClick={() => facebookRef.current.click()}
              >
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

              {session?.user?.id ? (
                <div className="group relative">
                  <ButtonPlus
                    padding={isLaptop ? 12 : 16}
                    iconSize={isLaptop ? 16 : 20}
                    buttonClass="!rounded-md"
                  />
                  <PlusDropDown
                    movieData={movieData}
                    type={pathname.split('/')[1]}
                  />
                </div>
              ) : (
                <ButtonPlus
                  padding={isLaptop ? 12 : 16}
                  iconSize={isLaptop ? 16 : 20}
                  buttonClass="!rounded-md"
                  onClick={() => neededSignInAlert(handleShowModelLogIn)}
                />
              )}
            </div>
            {isLaptop && (
              <MovieTagList
                movieData={movieData}
                className="!mb-0"
                category={movieData.title ? 'movie' : 'tv'}
                size="large"
                hidden={false}
              />
            )}
          </div>
          <FacebookShareButton
            ref={facebookRef}
            url={window.location.href}
            className="meta__social--facebook"
          ></FacebookShareButton>
        </Fragment>
      )}
    </Fragment>
  );
};

MainContent.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default MainContent;
