import { Fragment } from 'react';

import LoadingBounce from '~/components/Base/Loading/Bounce';
import ButtonPlay from '~/components/Common/Button/Play';
import MovieCardListX from '~/components/Common/Movie/CardListX';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';

const SearchUI = ({ type, query }) => {
  const searchApi = api.getSearch(
    query ? query : 'spiderman no way home',
    type,
    1
  );
  const { myData: searchData, isLoading: searchLoading } = useMySWR({
    api: searchApi,
  });
  return (
    <div className="flex flex-col w-full gap-[10px] overflow-y-auto scrollbar-hide">
      {searchLoading || !searchData || searchData.length === 0 ? (
        <LoadingBounce />
      ) : (
        <Fragment>
          <MovieCardListX moviesData={searchData} type={type} />
          <ButtonPlay
            message="Load more"
            displayIcon={false}
            widthType="full"
          />
        </Fragment>
      )}
    </div>
  );
};

export default SearchUI;
