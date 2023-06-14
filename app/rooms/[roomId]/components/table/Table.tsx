import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// components
import TableButton from './TableButton';
import SummaryTags from './SummaryTags';
import TableCardGroups from './TableCardGroups';

interface Props {
  children: ReactNode;
  extraClass: string;
}

const Table: NextPage<Props> = ({ children, extraClass }) => {
  return <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass}`}>{children}</div>;
};

export default Table;
