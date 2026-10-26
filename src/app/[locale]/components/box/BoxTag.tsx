type Props = {
  children: React.ReactNode;
};

const BoxTag = ({ children }: Props) => {
  return <span className='text-sm font-semibold underline underline-offset-4'># {children}</span>;
};

export default BoxTag;
