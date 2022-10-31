import { useParams } from 'react-router-dom';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';

const DetailMovie = () => {
  const { id } = useParams();
  const { myData } = useMySWR({ api: api.getDetail(id, 'movie') });
  return <div></div>;
};

export default DetailMovie;
