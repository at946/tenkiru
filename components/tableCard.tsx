import { NextPage } from "next";
import Card from "./card";

interface Props {
  state: string // none, close, open
  number: number
}

const TableCard: NextPage<Props> = ({ state, number }) => {
  switch (state) {
    case 'none':
      return <Card number={null} additionalStyle={{ border: 'dashed 2px black', background: 'rgba(0,0,0,0)' }} />
    case 'close':
      return <Card number={null} additionalClassName='has-background-primary' />
    case 'open':
      return <Card number={number} />
    default:
      return null
  }
}

export default TableCard