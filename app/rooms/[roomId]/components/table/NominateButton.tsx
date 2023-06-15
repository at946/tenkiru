import { NextPage } from 'next';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';
import toast from 'react-hot-toast';
import Button from '@/app/components/common/Button';

interface Props {
  isDisabled: boolean;
  nominate: () => void;
}

const NominateButton: NextPage<Props> = ({ isDisabled, nominate }) => {
  const onClick = (): void => {
    nominate();
    toast.success('指名しました！', {
      className: 'border-2 border-lime-500',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <Button
      label='指名'
      icon={faComment}
      isOutlined={true}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default NominateButton;
