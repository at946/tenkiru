import { NextPage } from "next";
import Card from "./card";

interface Props {
  value: number | string
  isSelected: boolean
  selectCard: (value: number | string) => void
}

const TefudaCard: NextPage<Props> = ({ value, isSelected, selectCard }) => {
  const selected = () => {
    selectCard(value)
  }

  return (
    <a onClick={selected}>
      <Card value={value} additionalClassName={isSelected ? 'has-background-danger has-text-white' : ''} />
    </a>
  )
}

export default TefudaCard