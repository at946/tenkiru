import { v4 } from 'uuid';
import HomePage from './HomePage';

const Page = () => {
  const roomId: string = v4();
  return <HomePage roomId={roomId} />;
};

export default Page;
