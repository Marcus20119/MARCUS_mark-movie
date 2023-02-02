import { useState } from 'react';
import Swal from 'sweetalert2';
import { ButtonPrimary } from '~/components/Button';
import { supabase } from '~/supabase';
import { loadingAlert, successAlert } from '~/utils';

const StatusInputPart = ({ userRow, forceRerender, setForceRerender }) => {
  const [content, setContent] = useState('');

  const handleAddPost = async e => {
    e.preventDefault();
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: `Your status will appear in Community Section!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF3D71',
        cancelButtonColor: '#cccccc30',
        confirmButtonText: 'Post it!',
        scrollbarPadding: false,
      }).then(async result => {
        if (result.isConfirmed) {
          loadingAlert();
          await supabase.from('statuses').upsert({
            user_id: userRow.id,
            user_name: userRow.username,
            user_avatar: userRow.avatar_url,
            like_count: 0,
            dislike_count: 0,
            content: content,
            created_at: new Date(),
          });
          setContent('');
          setForceRerender(!forceRerender);
          await successAlert({
            title: 'Posted Successfully!',
            text: 'Your status has been posted.',
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 bg-mainSection py-3 px-4 rounded-lg text-white80">
      <h3 className="font-bold text-xl text-white tracking-wide">Status</h3>
      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-3 w-full"
      >
        <textarea
          name="status"
          placeholder="What's on your mind?"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full bg-white80 rounded-md px-[12px] py-[6px] text-mainSection"
        />
        <div className="flex justify-between items-center">
          <span className="w-[60%] italic text-white80 opacity-50">
            Your post will appear in "Community Section" and everyone can see
            it!
          </span>
          <ButtonPrimary
            className="flex-1 px-3 py-2 rounded-lg font-normal"
            onClick={handleAddPost}
          >
            <i className="bx bxs-edit-alt"></i>
            <span>Post Status</span>
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default StatusInputPart;
