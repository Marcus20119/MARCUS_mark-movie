import { convertDate } from '~/helpers';

const IntroPart = ({ userRow }) => {
  const infoList = [
    {
      content: `Joined on ${convertDate(userRow.created_at, 'tz')}`,
      iconClass: 'bx bxs-user-check',
      additionalClass: '',
    },
    {
      content: `Email: ${userRow.email}`,
      iconClass: 'bx bxs-envelope',
      additionalClass: '',
    },
    {
      content: `Phone number: ${
        userRow?.phone_number ? userRow.phone_number : '...'
      }`,
      iconClass: 'bx bxs-phone',
      additionalClass: '',
    },
    {
      content: `Website: ${userRow?.website ? userRow.website : '...'}`,
      iconClass: 'bx bx-globe',
      additionalClass: '',
    },
  ];
  return (
    <div className="w-full bg-mainSection py-3 px-4 rounded-lg">
      <div className="flex flex-col items-start gap-3 text-white80">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-xl text-white tracking-wide">Intro</h3>
          <span className="italic text-white opacity-50 hover:!opacity-80 hover:!text-primary cursor-pointer">
            Edit Info
          </span>
        </div>

        <ul className="flex flex-col items-start gap-2">
          {infoList.map((infoItem, index) => (
            <li
              key={`sectionInfoItem-${index}`}
              className={`flex items-center gap-[10px] ${infoItem.additionalClass}`}
            >
              <i
                className={`flex justify-center items-center text-xl opacity-50 ${infoItem.iconClass}`}
              ></i>
              <span>
                {/* <pre className="font-mono">{infoItem.content}</pre> */}
                {infoItem.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntroPart;
