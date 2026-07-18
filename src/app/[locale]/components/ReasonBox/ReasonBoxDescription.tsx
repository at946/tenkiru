type Props = {
  children: React.ReactNode;
};

const ReasonBoxDescription = ({ children }: Props) => {
  return <p className='break-auto-phrase text-sm'>{children}</p>;
};

export default ReasonBoxDescription;
