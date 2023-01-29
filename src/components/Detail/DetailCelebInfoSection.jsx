import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api, neededSignInAlert, successToast, warningToast } from '~/utils';
import { convertDate } from '~/helpers';
import { ButtonPlus } from '../Button';
import ToolTipBase from '../Base/ToolTipBase';
import { useAuth } from '~/contexts/authContext';
import { useUser } from '~/contexts/userContext';
import { supabase, useFetchSingleRow } from '~/supabase';
import { useState } from 'react';

const DetailCelebInfoSection = ({ personData }) => {
  console.log('personData', personData);
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
  const { session } = useAuth();
  const { userRow, handleShowModelLogIn } = useUser();
  const [forceRefetching, setForceRefetching] = useState(false);
  const { rowData, loading, setLoading } = useFetchSingleRow({
    table: 'favorite_actors',
    match: { user_id: userRow.id, actor_id: personData.id },
    neededLogIn: true,
    initialLoading: true,
    rerenderCondition: [forceRefetching],
  });

  const handleAddToFavoriteList = () => {
    if (session?.user?.email) {
      const handleUpsertData = async () => {
        try {
          setLoading(true);
          const castRow = {
            // id: uuidv4(),
            user_id: userRow.id,
            biography: personData.biography,
            birthday: personData.birthday,
            gender: personData.gender,
            actor_id: personData.id.toString(),
            known_for_department: personData.known_for_department,
            name: personData.name,
            place_of_birth: personData.place_of_birth,
            profile_path: personData.profile_path,
            created_at: new Date(),
          };
          // await handleInsertToTable('favorite_actors', castRow);
          await supabase.from('favorite_actors').insert(castRow);
          setForceRefetching(true);
          successToast('Successfully added to favorite list');
        } catch (err) {
          console.log(err);
        }
      };
      if (rowData?.id && !loading) {
        warningToast('Already in favorite list');
      } else {
        handleUpsertData();
      }
    } else {
      neededSignInAlert(handleShowModelLogIn);
    }
  };

  return (
    <div className="flex w-full justify-between items-stretch gap-[28px] bg-[#222222] p-[40px]">
      <div className="relative flex-grow flex flex-col justify-start items-center gap-[20px] w-[20%]">
        <img
          className="block w-full h-full object-cover object-center rounded-md"
          src={
            personData.profile_path
              ? api.getPoster(personData.profile_path)
              : '/imgs/no-face.jpg'
          }
          alt={personData.name}
        />
        <div className="absolute top-[5%] right-[5%]">
          <ToolTipBase tipMessage="Add to favorite list">
            <ButtonPlus
              padding={12}
              iconSize={16}
              buttonClass="!rounded-md"
              onClick={handleAddToFavoriteList}
              disabled={loading}
            />
          </ToolTipBase>
        </div>
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
    </div>
  );
};

DetailCelebInfoSection.propTypes = {
  personData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailCelebInfoSection, {
  FallbackComponent: ErrorFallBack,
});
