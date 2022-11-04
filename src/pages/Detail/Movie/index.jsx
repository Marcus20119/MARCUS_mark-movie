import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailMovie from '~/components/Detail/Movie';

const DetailMoviePage = () => {
  const { id } = useParams();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [id]);

  return (
    <Fragment>
      <DetailMovie type="movie" />
    </Fragment>
  );
};

export default DetailMoviePage;
