/* eslint-disable no-labels */
import { useEffect, useState } from 'react';
import { InputBar } from '~/components/Bar';
import ModalBase from '~/components/Base/ModalBase';
import { useUser } from '~/contexts/userContext';
import { supabase } from '~/supabase';
import { errorToast, successToast } from '~/utils';

const ModalEditInfo = () => {
  const {
    showModelEditInfo,
    handleHideModelEditInfo,
    userRow,
    handleForceGetUserRow,
  } = useUser();
  const [newUserRow, setNewUserRow] = useState({});
  useEffect(() => {
    if (userRow) {
      setNewUserRow({
        id: userRow.id,
        username: userRow.username,
        full_name: userRow.full_name,
        website: userRow.website,
        phone_number: userRow.phone_number,
      });
    }
  }, [userRow]);

  const [updateLoading, setUpdateLoading] = useState(false);
  const handleAddToFavorite = () => {
    const handleUpsertData = async () => {
      block: try {
        setUpdateLoading(true);
        const { error } = await supabase.from('profiles').upsert(newUserRow);
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
        handleForceGetUserRow();
        successToast('Successfully update your info!');
      } catch (err) {
        console.log(err);
      } finally {
        setUpdateLoading(false);
        handleHideModelEditInfo();
      }
    };
    handleUpsertData();
  };
  return (
    <ModalBase visible={showModelEditInfo} onClose={handleHideModelEditInfo}>
      <div className="relative w-[450px] bg-[#181818] px-12 py-[40px] rounded-2xl z-2 transition-all float-border">
        <div className="w-full">
          <form className="w-full" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-[16px] my-[8px]">
              <div className="flex flex-col gap-[16px] my-[8px]">
                <InputBar
                  name="username"
                  label="User Name"
                  value={newUserRow.username}
                  setValue={setNewUserRow}
                />
                <InputBar
                  name="full_name"
                  label="Full Name"
                  value={newUserRow.full_name}
                  setValue={setNewUserRow}
                />
                <InputBar
                  name="website"
                  label="Website"
                  value={newUserRow.website}
                  setValue={setNewUserRow}
                />
                <InputBar
                  name="phone_number"
                  label="Phone Number"
                  value={newUserRow.phone_number}
                  setValue={setNewUserRow}
                />
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-[8px] rounded-[4px] text-[14px] py-[10px] px-[15px] border !border-primary font-sans text-white hover:bg-primary font-normal"
                onClick={handleAddToFavorite}
                disabled={updateLoading}
              >
                Update Your Info
              </button>
            </div>
          </form>
        </div>
        <button
          className="close-modal absolute top-0 right-6 text-[1.75rem] hover:opacity-70"
          onClick={handleHideModelEditInfo}
        ></button>
      </div>
    </ModalBase>
  );
};

export default ModalEditInfo;
