import PropTypes from 'prop-types';
import { Fragment } from 'react';

const DetailSubContent = ({ movieData }) => {
  const subInfo = [
    {
      title: 'PRODUCTION COMPANY',
      content: movieData?.production_companies?.[0]?.name || 'Unknown',
    },
    {
      title: 'COUNTRIES',
      content: movieData?.production_countries
        ? movieData.production_countries
            .map(country => country.iso_3166_1)
            .join(', ')
        : 'Unknown',
    },
    {
      title: 'RELEASE DATE',
      content: movieData.release_date || 'Unknown',
    },
  ];
  return (
    <Fragment>
      <div className="inline-flex justify-start items-center gap-[20px] my-[24px]">
        <div className="flex flex-col gap-[8px]">
          {subInfo.map((item, index) => (
            <span key={`subInfoTitle${index}`} className="text-[#7A7A7A]">
              {item.title}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-[8px]">
          {subInfo.map((item, index) => (
            <span
              key={`subInfoContent${index}`}
              className="text-white font-bold"
            >
              {item.content}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[#b5b5b5]">{movieData.overview}</p>
    </Fragment>
  );
};

DetailSubContent.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default DetailSubContent;
