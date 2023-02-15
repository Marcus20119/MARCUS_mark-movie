import { Fragment } from 'react';
import LoadingBounce from '../Base/Loading/Bounce';

const SearchNotFoundAndLoading = ({ loading, data }) => {
  return (
    <Fragment>
      {!loading && data.results && data.results.length === 0 && (
        <span className="block text-[rgba(255,_255,_255,_0.8)] mt-3 ml-1">
          No result was found! Try another keyword . . .
        </span>
      )}
      {(loading || !data.results) && (
        <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto mt-3" />
      )}
    </Fragment>
  );
};

export { SearchNotFoundAndLoading };
