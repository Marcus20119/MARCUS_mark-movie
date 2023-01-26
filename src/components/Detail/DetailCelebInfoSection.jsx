import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api } from '~/config';
import { convertDate } from '~/helpers';

const DetailCelebInfoSection = ({ personData }) => {
  const PersonalInfo = [
    {
      field: 'Known for department',
      value: personData.known_for_department || 'Unknown',
    },
    {
      field: 'Gender',
      value: personData.gender
        ? personData.gender === 1
          ? 'Female'
          : 'Male'
        : 'Unknown',
    },
    {
      field: 'Born',
      value: `${
        personData.birthday ? `${convertDate(personData.birthday)} - ` : ''
      }${personData.place_of_birth || ''}`,
    },
  ];
  return (
    <Fragment>
      <div className="flex flex-col justify-start items-start gap-[20px] w-[20%]">
        <img
          className="block w-full object-cover object-center rounded-md"
          src={
            personData.profile_path
              ? api.getPoster(personData.profile_path)
              : '/imgs/no-face.jpg'
          }
          alt={personData.name}
        />
      </div>
      <div className="flex flex-col items-start gap-[12px] w-[80%]">
        <h1 className="text-5xl text-white font-merri mb-0 leading-[3.7rem]">
          {personData.name}
        </h1>
        <div className="inline-flex justify-start items-center gap-[20px] my-[12px]">
          <div className="flex flex-col gap-[8px]">
            {PersonalInfo.map((item, index) => (
              <span key={`subInfoTitle${index}`} className="text-[#7A7A7A]">
                {item.field}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-[8px]">
            {PersonalInfo.map((item, index) => (
              <span
                key={`subInfoContent${index}`}
                className="text-white font-bold"
              >
                {item.value}
              </span>
            ))}
          </div>
        </div>
        {personData.biography && (
          <div className="flex flex-col items-start gap-[2px]">
            <h3 className="text-2xl text-white font-bold mb-3">Biography</h3>
            <p className="custom-scrollbar w-full pr-[12px] text-[#b5b5b5] h-[7.5rem] overflow-y-auto">
              {personData.biography}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

DetailCelebInfoSection.propTypes = {
  personData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailCelebInfoSection, {
  FallbackComponent: ErrorFallBack,
});
