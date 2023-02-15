import { v4 } from 'uuid';
import HomePage from './HomePage';

export default function Page() {
  const roomId: string = v4();
  return <HomePage roomId={roomId} />;
}
