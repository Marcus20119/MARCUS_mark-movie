/* eslint-disable no-labels */
import { useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { useUser } from '~/contexts/userContext';
import { supabase, useFetchSingleRow } from '~/supabase';
import {
  errorToast,
  neededSignInAlert,
  successToast,
  warningToast,
} from '~/utils';

export function usePlusDropDown({ movieData, type }) {
  const { session, handleShowModelLogIn } = useAuth();
  const { userRow } = useUser();
  const id_field = `${type}_id`;

  // Xử lý add to favorite list
  const [forceRefetchingFavorite, setForceRefetchingFavorite] = useState(false);
  const {
    rowData: favoriteRow,
    loading: favoriteLoading,
    setLoading: setFavoriteLoading,
  } = useFetchSingleRow({
    table: `favorite_${type}s`,
    match: { user_id: session.user.id, [id_field]: movieData.id },
    neededLogIn: true,
    initialLoading: true,
    rerenderCondition: [forceRefetchingFavorite, session],
  });
  const handleAddToFavorite = () => {
    if (session?.user?.email) {
      const handleUpsertData = async () => {
        block: try {
          setFavoriteLoading(true);
          const newRow = {
            user_id: userRow.id,
            [id_field]: movieData.id,
            title: type === 'movie' ? movieData.title : movieData.name,
            vote_average: parseFloat(movieData.vote_average).toFixed(1),
            poster_path: movieData.poster_path,
          };
          const { error } = await supabase
            .from(`favorite_${type}s`)
            .insert(newRow);
          if (error) {
            errorToast('Error: ', error.message);
            console.error(error);
            break block;
          }
          setForceRefetchingFavorite(true);
          successToast('Successfully added to favorite list');
        } catch (err) {
          console.log(err);
        }
      };
      if (favoriteRow?.[0]?.id && !favoriteLoading) {
        warningToast('Already in favorite list');
      } else {
        handleUpsertData();
      }
    } else {
      neededSignInAlert(handleShowModelLogIn);
    }
  };

  // Xử lý add to favorite list
  const [forceRefetchingWatchlist, setForceRefetchingWatchlist] =
    useState(false);
  const {
    rowData: watchlistRow,
    loading: watchlistLoading,
    setLoading: setWatchlistLoading,
  } = useFetchSingleRow({
    table: `watchlist_${type}s`,
    match: { user_id: session.user.id, [id_field]: movieData.id },
    neededLogIn: true,
    initialLoading: true,
    rerenderCondition: [forceRefetchingWatchlist, session],
  });
  const handleAddToWatchlist = () => {
    if (session?.user?.email) {
      const handleUpsertData = async () => {
        block: try {
          setWatchlistLoading(true);
          const newRow = {
            user_id: userRow.id,
            [id_field]: movieData.id,
            title: type === 'movie' ? movieData.title : movieData.name,
            poster_path: movieData.poster_path,
            vote_average: parseFloat(movieData.vote_average).toFixed(1),
            genre_ids: movieData?.genre_ids
              ? movieData.genre_ids
              : movieData?.genres
              ? movieData.genres.map(item => item.id)
              : [],
            release_date: movieData.release_date || movieData.first_air_date,
          };
          const { error } = await supabase
            .from(`watchlist_${type}s`)
            .insert(newRow);
          if (error) {
            errorToast('Error: ', error.message);
            console.error(error);
            break block;
          }
          setForceRefetchingWatchlist(true);
          successToast('Successfully added to watchlist');
        } catch (err) {
          console.log(err);
        }
      };
      if (watchlistRow?.[0]?.id && !watchlistLoading) {
        warningToast('Already in watchlist');
      } else {
        handleUpsertData();
      }
    } else {
      neededSignInAlert(handleShowModelLogIn);
    }
  };
  return {
    favoriteLoading,
    handleAddToFavorite,
    watchlistLoading,
    handleAddToWatchlist,
  };
}
