import { api } from '~/config';

const AvatarSection = ({ personData }) => {
  console.log('personData', personData);
  return (
    <div className="flex flex-col justify-start items-start gap-[20px] w-[20%]">
      <img
        className="block w-full object-cover object-center"
        src={
          personData.profile_path
            ? api.getPoster(personData.profile_path)
            : '/no-face.jpg'
        }
        alt={personData.name}
      />
    </div>
  );
};

export default AvatarSection;
