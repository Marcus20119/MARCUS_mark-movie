import { Fragment, useEffect, useRef, useState } from 'react';
import { supabase } from '~/supabase';
import './Avatar.scss';

export default function Wallpaper({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const downloadImage = async path => {
    try {
      const { data, error } = await supabase.storage
        .from('wallpapers')
        .download(path);
      if (error) {
        throw error;
      }
      const blob = URL.createObjectURL(data);
      setAvatarUrl(blob);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
      return '';
    }
  };

  useEffect(() => {
    if (url) {
      downloadImage(url);
      return () => URL.revokeObjectURL(avatarUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

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
        .from('wallpapers')
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
    <Fragment>
      <div className="userAvatar w-full ">
        <div className="overflow-hidden">
          <div
            className="block w-full h-[350px] object-top backdrop-blur-3xl opacity-50 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: avatarUrl
                ? `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), url('${avatarUrl}')`
                : `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), url('/imgs/no-backdrop.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          ></div>

          {uploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <img
                src="/imgs/loading-gif.gif"
                alt="loading"
                className="block w-[64px] h-[64px]"
              />
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
      <div
        className="absolute top-[275px] right-[5%] flex justify-center items-center gap-2 bg-[rgba(255,_255,_255,_0.8)] px-3 py-2 rounded-lg z-20 cursor-pointer hover:bg-white"
        title="Upload an avatar"
        onClick={() => inputRef.current.click()}
      >
        <i className="bx bxs-camera text-lg"></i>
        <span className="font-bold">Edit cover photo</span>
      </div>
    </Fragment>
  );
}
