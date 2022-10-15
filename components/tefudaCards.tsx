import { NextPage } from "next";
import { Card } from "../interfaces/card";
import TefudaCard from "./tefudaCard";

interface Props {
  selectedCard: Card
  canSelected: boolean
  select: (card: Card) => void
}

const TefudaCards: NextPage<Props> = ({ selectedCard, canSelected, select }) => {
  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {[1, 2, 3, 5, 8, 13, 21, '?'].map((card) => (
        <TefudaCard
          key={card}
          value={card}
          isSelected={card === selectedCard}
          isDisabled={!canSelected}
          selectCard={select}
        />
      ))}
    </div>
  )
}

export default TefudaCards