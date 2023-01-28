import { Fragment, useEffect, useRef, useState } from 'react';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { useAuth } from '~/contexts/authContext';
import { supabase } from '~/supabase';
import './Avatar.scss';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  console.log('uploading', uploading);
  const { loadingGetUserRow } = useAuth();
  console.log('loadingGetUserRow', loadingGetUserRow);

  useEffect(() => {
    if (url) {
      downloadImage(url);
      return () => URL.revokeObjectURL(avatarUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const downloadImage = async path => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

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
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div aria-live="polite" className="userAvatar w-[200px]">
      <div className="relative">
        <img
          src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
          alt={avatarUrl ? 'Avatar' : 'No image'}
          className="block w-[200px] h-[200px] object-cover rounded-full border-[2px] border-solid border-[var(--primary-color)] cursor-pointer"
        />
        <div
          className="inputAvatar-icon z-10"
          title="Upload an avatar"
          onClick={() => inputRef.current.click()}
        >
          <i className="bx bxs-camera"></i>
        </div>
        {(uploading || loadingGetUserRow) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full border-[2px] border-solid border-transparent p-16 z-5">
            <img src="/imgs/loading-gif.gif" alt="loading" />
          </div>
        )}
      </div>
      {uploading && 'Uploading...'}
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
