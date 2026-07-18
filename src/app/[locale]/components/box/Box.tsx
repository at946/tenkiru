type Props = {
  children: React.ReactNode;
};

const Box = ({ children }: Props) => {
  return <div className='flex flex-col items-center gap-6 rounded-lg border-3 p-6'>{children}</div>;
};

export default Box;
