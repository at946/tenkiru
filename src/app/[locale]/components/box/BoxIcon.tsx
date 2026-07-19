type Props = {
  className: string;
};

const BoxIcon = ({ className }: Props) => {
  return <span className={`text-6xl ${className}`} />;
};

export default BoxIcon;
