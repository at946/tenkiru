type Props = {
  children: React.ReactNode;
};

const ReasonBoxTitle = ({ children }: Props) => {
  return <p className='break-auto-phrase mb-4 font-semibold text-lg'>{children}</p>;
};

export default ReasonBoxTitle;
