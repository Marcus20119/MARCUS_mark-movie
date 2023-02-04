/* eslint-disable no-labels */
import { useEffect, useState } from 'react';
import { useUser } from '~/contexts/userContext';
import { supabase } from '~/supabase';
import { errorToast } from '~/utils';

export function useLikeAndDislike({ status, likesTable }) {
  const { userRow } = useUser();
  const [forceDisable, setForceDisable] = useState(false);
  const [quantityLike, setQuantityLike] = useState(status.like_count);
  const [quantityDislike, setQuantityDislike] = useState(status.dislike_count);

  // Khởi tạo trạng thái like post của user
  const [likeRow, setLikeRow] = useState();
  const [likeStatus, setLikeStatus] = useState();
  useEffect(() => {
    if (userRow?.id) {
      const initialLikeRow = likesTable.find(
        item => item.status_id === status.id
      );
      if (initialLikeRow) {
        setLikeRow(initialLikeRow);
        setLikeStatus(initialLikeRow.like_status);
      } else {
        setLikeRow({
          user_id: userRow.id,
          status_id: status.id,
          like_status: 0,
        });
        setLikeStatus(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likesTable, userRow]);

  const handleReset = async currentStatus => {
    block: try {
      setForceDisable(true);
      if (currentStatus === 'like') {
        setQuantityLike(prev => prev - 1);
        const { error } = await supabase
          .from('statuses')
          .upsert({ ...status, like_count: quantityLike - 1 });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      } else if (currentStatus === 'dislike') {
        setQuantityDislike(prev => prev - 1);
        const { error } = await supabase
          .from('statuses')
          .upsert({ ...status, dislike_count: quantityDislike - 1 });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      }
      setLikeStatus(0);
      const { error } = await supabase
        .from('likes')
        .upsert({ ...likeRow, like_status: 0 });
      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisable(false);
    }
  };
  const handleSingleUpdate = async newStatus => {
    block: try {
      setForceDisable(true);
      if (newStatus === 'like') {
        setQuantityLike(prev => prev + 1);
        setLikeStatus(1);
        const { error } = await supabase
          .from('statuses')
          .upsert({ ...status, like_count: quantityLike + 1 });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      } else if (newStatus === 'dislike') {
        setQuantityDislike(prev => prev + 1);
        setLikeStatus(-1);
        const { error } = await supabase
          .from('statuses')
          .upsert({ ...status, dislike_count: quantityDislike + 1 });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      }
      const { error } = await supabase
        .from('likes')
        .upsert({ ...likeRow, like_status: newStatus === 'like' ? 1 : -1 });
      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisable(false);
    }
  };
  const handleDoubleUpdate = async newStatus => {
    block: try {
      setForceDisable(true);
      if (newStatus === 'like') {
        setQuantityLike(prev => prev + 1);
        setQuantityDislike(prev => prev - 1);
        setLikeStatus(1);
        const { error } = await supabase.from('statuses').upsert({
          ...status,
          like_count: quantityLike + 1,
          dislike_count: quantityDislike - 1,
        });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      } else if (newStatus === 'dislike') {
        setQuantityLike(prev => prev - 1);
        setQuantityDislike(prev => prev + 1);
        setLikeStatus(-1);
        const { error } = await supabase.from('statuses').upsert({
          ...status,
          like_count: quantityLike - 1,
          dislike_count: quantityDislike + 1,
        });
        if (error) {
          errorToast('Error: ', error.message);
          console.error(error);
          break block;
        }
      }
      const { error } = await supabase
        .from('likes')
        .upsert({ ...likeRow, like_status: newStatus === 'like' ? 1 : -1 });
      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setForceDisable(false);
    }
  };

  return {
    forceDisable,
    quantityLike,
    quantityDislike,
    likeStatus,
    handleReset,
    handleSingleUpdate,
    handleDoubleUpdate,
  };
}
