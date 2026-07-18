type Props = {
  children: React.ReactNode;
};

const BoxDescription = ({ children }: Props) => {
  return <p className='break-auto-phrase text-sm'>{children}</p>;
};

export default BoxDescription;
