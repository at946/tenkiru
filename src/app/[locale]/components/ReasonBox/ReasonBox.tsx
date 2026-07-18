type Props = {
  icon: string;
  iconColor: string;
  children: React.ReactNode;
};

const ReasonBox = ({ icon, iconColor, children }: Props) => {
  return (
    <div className='rounded-lg border-2 p-5 shadow-sm'>
      <span className={`icon-[${icon}] text-6xl text-${iconColor} mb-3`} />
      {children}
    </div>
  );
};

export default ReasonBox;
