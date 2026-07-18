type Props = {
  children: React.ReactNode;
};

const ReasonBox = ({ children }: Props) => {
  return <div className='rounded-lg border-3 p-5'>{children}</div>;
};

export default ReasonBox;
