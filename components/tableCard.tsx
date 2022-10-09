import { NextPage } from 'next';
import Card from './card';

interface Props {
  putDown: boolean;
  isOpen: boolean;
  value: number | string | null;
}

const TableCard: NextPage<Props> = ({ putDown, isOpen, value }) => {
  if (putDown) {
    if (isOpen) {
      return <Card value={value} />;
    } else {
      return <Card value={null} additionalClassName='has-background-primary' />;
    }
  } else {
    return (
      <Card
        value={null}
        additionalStyle={{ border: 'dashed 2px black', background: 'rgba(0,0,0,0)' }}
      />
    );
  }
};

export default TableCard;
