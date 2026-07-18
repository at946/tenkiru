type Props = {
  className: string;
};

const ReasonBoxIcon = ({ className }: Props) => {
  return <span className={`mb-3 text-6xl text-primary ${className}`} />;
};

export default ReasonBoxIcon;
