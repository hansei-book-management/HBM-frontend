import { useParams } from 'react-router-dom';

export const DetailPage: React.FC = () => {
  const { bookId } = useParams();
  return (
    <div>
      <h1>Detail</h1>
      <h3>{bookId}</h3>
    </div>
  );
};
