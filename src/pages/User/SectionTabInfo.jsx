// created_at
// email
// fullname
// phone_number
// website

import { useState } from 'react';
import { InputBar } from '~/components/Bar';
import { ButtonPrimary } from '~/components/Button';
import { convertDate } from '~/helpers';

const SectionTabInfo = ({ userRow }) => {
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
        userRow?.phone_number ? userRow?.phone_number : '. . .'
      }`,
      iconClass: 'bx bxs-phone',
      additionalClass: '',
    },
    {
      content: `Website: ${userRow?.website ? userRow?.website : '. . .'}`,
      iconClass: 'bx bx-globe',
      additionalClass: '',
    },
  ];
  const [status, setStatus] = useState('');
  return (
    <div className="flex items-start gap-[30px] ">
      <div className="w-[35%] bg-mainSection py-3 px-4 rounded-lg">
        <div className="flex flex-col items-start gap-3 text-white80">
          <h3 className="font-bold text-xl text-white tracking-wide">Intro</h3>
          <ul className="flex flex-col items-start gap-2">
            {infoList.map((infoItem, index) => (
              <li
                key={`sectionInfoItem-${index}`}
                className={`flex items-center gap-[10px] ${infoItem.additionalClass}`}
              >
                <i
                  class={`flex justify-center items-center text-xl opacity-50 ${infoItem.iconClass}`}
                ></i>
                <span>{infoItem.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-mainSection py-3 px-4 rounded-lg">
        <div className="flex flex-col items-start gap-3 text-white80">
          <h3 className="font-bold text-xl text-white tracking-wide">Status</h3>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex flex-col gap-3 w-full"
          >
            <textarea
              name="status"
              placeholder="What's on your mind?"
              onChange={e => setStatus(e.target.value)}
              className="w-full bg-white80 rounded-md px-[12px] py-[6px] text-mainSection"
            />
            <div className="flex justify-between items-center">
              <span className="w-[60%] italic text-white80 opacity-50">
                Your post will appear in "Community Section" and everyone can
                see it!
              </span>
              <ButtonPrimary className="flex-1 px-3 py-2 rounded-lg font-normal">
                <i className="bx bxs-edit-alt"></i>
                <span>Post Status</span>
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionTabInfo;
