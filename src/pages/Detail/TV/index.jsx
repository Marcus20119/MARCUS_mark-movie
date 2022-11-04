import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailTV from '~/components/Detail/TV';

const DetailTVPage = () => {
  const { id } = useParams();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [id]);

  return (
    <Fragment>
      <DetailTV type="tv" />
    </Fragment>
  );
};

export default DetailTVPage;
