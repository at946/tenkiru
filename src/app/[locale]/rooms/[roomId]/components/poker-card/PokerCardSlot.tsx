interface Props {
  children?: React.ReactNode;
}

const PokerCardSlot = ({ children }: Props) => {
  return (
    <div className='relative aspect-card w-24'>
      <div aria-hidden='true' className='absolute inset-0 rounded-xl border-2 border-white' />

      <div className='absolute inset-1 flex items-center justify-center'>{children}</div>
    </div>
  );
};

export default PokerCardSlot;
