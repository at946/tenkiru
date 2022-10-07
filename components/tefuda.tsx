import { NextPage } from "next";
import TefudaCard from './tefudaCard';

interface Props {
  selectedCard: number | null
  putDownCard: (number: number) => void
}

const Tefuda: NextPage<Props> = ({ selectedCard, putDownCard }) => {
  const selectCard = (number: number): void => {
    putDownCard(number)
  }
  
  return (
    <div className="is-flex is-justify-content-center has-background-light box is-shadowless">
      {
        [1, 2, 3, 5, 8, 13, 21].map(number =>
          <TefudaCard key={number} number={number} isSelected={ (number === selectedCard) } selectCard={selectCard} />
        )
      }
    </div>
  )
}

export default Tefuda