import { Fragment, useRef, useState } from 'react';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { useUser } from '~/contexts/userContext';
import { useForceRerender, useResponsive } from '~/hooks';
import { supabase } from '~/supabase';
import './Avatar.scss';

export default function Avatar({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const { avatarUrl, userRow } = useUser();
  useForceRerender([avatarUrl]);
  const inputRef = useRef();

  const handleChangeStatusAvatar = async filePath => {
    try {
      const { data } = await supabase
        .from('statuses')
        .select()
        .match({ user_id: userRow.id });
      const newData = await data.map(status => {
        return { ...status, user_avatar: filePath };
      });
      await supabase.from('statuses').upsert(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadAvatar = async event => {
    let filePath;
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      onUpload(filePath);
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
    }
    handleChangeStatusAvatar(filePath);
  };

  const { isMobile } = useResponsive();

  return (
    <div
      className={`userAvatar ${!isMobile ? 'w-[200px]' : 'w-[180px] mx-auto'}`}
    >
      <div className="relative">
        <div
          className={`block rounded-full border-[4px] border-solid border-[#222] overflow-hidden ${
            !isMobile ? 'w-[200px] h-[200px]' : 'w-[180px] h-[180px]'
          }`}
        >
          <img
            src={avatarUrl ? avatarUrl : '/imgs/no-face.jpg'}
            alt={avatarUrl ? 'Avatar' : 'No image'}
            className="block w-full h-full object-cover cursor-pointer"
            onClick={() => inputRef.current.click()}
          />
        </div>
        <ToolTipBase
          tipMessage="Upload an avatar"
          position="bottom"
          moveDown={10}
        >
          <div
            className="inputAvatar-icon z-10"
            onClick={() => inputRef.current.click()}
          >
            <i className={`bx bxs-camera ${isMobile && '!text-3xl'}`}></i>
          </div>
        </ToolTipBase>
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full border-[2px] border-solid border-transparent p-16 z-5">
            <img src="/imgs/loading-gif.gif" alt="loading" />
          </div>
        )}
      </div>
      <Fragment>
        <label className="button primary hidden" htmlFor="single">
          Upload an avatar
        </label>
        <div className="visually-hidden hidden">
          <input
            ref={inputRef}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </Fragment>
    </div>
  );
}
