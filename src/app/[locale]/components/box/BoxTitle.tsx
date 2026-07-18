type Props = {
  children: React.ReactNode;
};

const BoxTitle = ({ children }: Props) => {
  return <p className='break-auto-phrase font-semibold text-lg'>{children}</p>;
};

export default BoxTitle;
