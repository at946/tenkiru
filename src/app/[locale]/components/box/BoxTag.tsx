type Props = {
  children: React.ReactNode;
};

const BoxTag = ({ children }: Props) => {
  return <span className='font-semibold text-sm underline underline-offset-4'># {children}</span>;
};

export default BoxTag;
