import { Fragment, useRef, useState } from 'react';
import { useUser } from '~/contexts/userContext';
import { useForceRerender } from '~/hooks';
import { supabase } from '~/supabase';
import './Avatar.scss';

export default function Avatar({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const { avatarUrl } = useUser();
  useForceRerender([avatarUrl]);

  const inputRef = useRef();

  const uploadAvatar = async event => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

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
  };

  return (
    <div className="userAvatar w-[200px]">
      <div className="relative">
        <img
          src={avatarUrl ? avatarUrl : '/imgs/no-face.jpg'}
          alt={avatarUrl ? 'Avatar' : 'No image'}
          className="block w-[200px] h-[200px] object-cover rounded-full border-[4px] border-solid border-[#222] cursor-pointer"
        />
        <div
          className="inputAvatar-icon z-10"
          title="Upload an avatar"
          onClick={() => inputRef.current.click()}
        >
          <i className="bx bxs-camera"></i>
        </div>
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
