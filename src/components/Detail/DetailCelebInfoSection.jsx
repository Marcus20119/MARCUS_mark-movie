/* eslint-disable no-labels */
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import {
  api,
  errorToast,
  neededSignInAlert,
  successToast,
  warningToast,
} from '~/utils';
import { convertDate } from '~/helpers';
import { ButtonPlus } from '../Button';
import ToolTipBase from '../Base/ToolTipBase';
import { useAuth } from '~/contexts/authContext';
import { supabase, useFetchSingleRow } from '~/supabase';
import { useUser } from '~/contexts/userContext';
import ProgressiveImg from '../Base/ProgressiveImg';
import { useResponsive } from '~/hooks';

const DetailCelebInfoSection = ({ personData }) => {
  const { isTablet, isLaptop } = useResponsive();
  const PersonalInfo = [
    {
      field: isLaptop ? 'Known for department' : 'Known for',
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
  const { session, handleShowModelLogIn } = useAuth();
  const { userRow } = useUser();
  const [forceRefetching, setForceRefetching] = useState(false);
  const { rowData, loading, setLoading } = useFetchSingleRow({
    table: 'favorite_actors',
    match: {
      user_id: session?.user?.id ? session.user.id : '',
      actor_id: personData.id,
    },
    neededLogIn: true,
    initialLoading: true,
    rerenderCondition: [forceRefetching, session],
  });

  const handleAddToFavoriteList = () => {
    if (session?.user?.email) {
      const handleUpsertData = async () => {
        block: try {
          setLoading(true);
          const castRow = {
            user_id: userRow.id,
            biography: personData.biography,
            birthday: personData.birthday,
            gender: personData.gender,
            actor_id: personData.id.toString(),
            known_for_department: personData.known_for_department,
            name: personData.name,
            place_of_birth: personData.place_of_birth,
            profile_path: personData.profile_path,
          };
          const { error } = await supabase
            .from('favorite_actors')
            .insert(castRow);
          if (error) {
            errorToast('Error: ', error.message);
            console.error(error);
            break block;
          }
          setForceRefetching(true);
          successToast('Successfully added to favorite list');
        } catch (err) {
          console.log(err);
        }
      };
      if (rowData?.[0]?.id && !loading) {
        warningToast('Already in favorite list');
      } else {
        handleUpsertData();
      }
    } else {
      neededSignInAlert(handleShowModelLogIn);
    }
  };

  return (
    <div className="flex w-full justify-between items-stretch gap-[28px] !bg-mainSection p-[40px]">
      <div
        className={`relative flex-1 flex flex-col justify-start items-center gap-[20px] ${
          isLaptop && 'w-[20%]'
        } ${isTablet && ''}`}
      >
        {personData?.profile_path ? (
          <ProgressiveImg
            src={api.getPoster(personData.profile_path, 'h632')}
            placeholderSrc={api.getPoster(personData.profile_path, 'w45')}
            alt={personData.profile_path}
            resetClassName={true}
            className="block w-full h-full object-cover object-center rounded-md"
          />
        ) : (
          <img
            className="block w-full h-full object-cover object-center rounded-md"
            src="/imgs/no-user.png"
            alt="no-poster"
          />
        )}
        <div className="absolute top-[5%] right-[5%]">
          <ToolTipBase tipMessage="Add to favorite list">
            <ButtonPlus
              padding={isLaptop ? 12 : 16}
              iconSize={isLaptop ? 16 : 20}
              buttonClass="!rounded-md"
              onClick={handleAddToFavoriteList}
              disabled={loading}
            />
          </ToolTipBase>
        </div>
      </div>
      <div
        className={`flex flex-col items-start gap-[12px] ${
          isLaptop && 'w-[78%]'
        } ${isTablet && 'w-[60%]'}`}
      >
        <h1 className="text-5xl text-white font-merri mb-0 leading-[3.7rem]">
          {personData.name}
        </h1>
        <div className="inline-flex justify-start items-start gap-[20px] my-[12px]">
          <div className={`flex flex-col gap-[8px] ${isTablet && 'w-[30%]'}`}>
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
            <p
              className={`custom-scrollbar w-full pr-[12px] text-[#b5b5b5] overflow-y-auto ${
                isLaptop && 'h-[9.5rem]'
              } ${isTablet && 'h-[5rem]'}`}
            >
              {personData.biography}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

DetailCelebInfoSection.propTypes = {
  personData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailCelebInfoSection, {
  FallbackComponent: ErrorFallBack,
});
