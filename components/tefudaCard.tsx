import { NextPage } from "next";
import Card from "./card";

interface Props {
  number: number
  isSelected: boolean
  selectCard: (val: number) => void
}

const TefudaCard: NextPage<Props> = ({ number, isSelected, selectCard }) => {
  const selected = () => {
    selectCard(number)
  }

  return (
    <a onClick={selected}>
      <Card number={number} additionalClassName={isSelected ? 'has-background-danger has-text-white' : ''} />
    </a>
  )
}

export default TefudaCard