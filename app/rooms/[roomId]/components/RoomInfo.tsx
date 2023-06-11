import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  roomId: string;
  extraClass: string;
}

const RoomInfo: NextPage<Props> = ({ roomId, extraClass }) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`);
    toast.success('この部屋のURLをコピーしました', {
      className: 'border border-lime-500',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'copy_room_url', category: 'engagement', label: '' });
  };

  return (
    <div className={extraClass}>
      <button
        onClick={copyUrl}
        className='cursor-pointer px-2 hover:text-purple-600 focus:text-purple-600'
      >
        <span>部屋番号：{roomId}</span>
        <FontAwesomeIcon icon={faLink} className='ml-2' />
      </button>
      <Toaster />
    </div>
  );
};

export default RoomInfo;
