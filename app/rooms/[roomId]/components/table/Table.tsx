import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  extraClass: string;
}

const Table: NextPage<Props> = ({ children, extraClass }) => {
  return <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass}`}>{children}</div>;
};

export default Table;
