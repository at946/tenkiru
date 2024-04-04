import ClipboardCopyLink from '@/app/components/common/ClipboardCopyLink';
import { event } from '@/lib/gtag';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import toast from 'react-hot-toast';

interface Props {
  roomId: string;
  extraClass: string;
}

const RoomInfo: NextPage<Props> = ({ roomId, extraClass }) => {
  const onCopiedRoomUrl = (): void => {
    toast.success('この部屋のURLをコピーしました', {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'copy_room_url', category: 'engagement', label: '' });
  };

  return (
    <div className={`${extraClass || ''}`}>
      <ClipboardCopyLink
        copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`}
        extraClass='my-5'
        onCopied={onCopiedRoomUrl}
      >
        <span>部屋番号：{roomId}</span>
        <FontAwesomeIcon icon={faLink} className='ml-2' />
      </ClipboardCopyLink>
    </div>
  );
};

export default RoomInfo;
