import { NextPage } from "next";
import Card from "./card";

interface Props {
  state: string // none, close, open
  value: number | string | null
}

const TableCard: NextPage<Props> = ({ state, value }) => {
  switch (state) {
    case 'none':
      return <Card value={null} additionalStyle={{ border: 'dashed 2px black', background: 'rgba(0,0,0,0)' }} />
    case 'close':
      return <Card value={null} additionalClassName='has-background-primary' />
    case 'open':
      return <Card value={value} />
    default:
      return null
  }
}

export default TableCard