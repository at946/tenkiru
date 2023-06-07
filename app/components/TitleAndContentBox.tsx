import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  extraClass?: string;
}

const TitleAndContentBox: NextPage<Props> = ({ children, title, extraClass }) => {
  return (
    <div className={`mx-auto max-w-3xl border p-3 text-left shadow-sm ${extraClass || ''}`}>
      <h2 className='text-lg font-bold'>{title}</h2>
      <hr className='mb-4 mt-2' />
      <p>{children}</p>
    </div>
  );
};

export default TitleAndContentBox;
