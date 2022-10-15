import { NextPage } from "next";

const DeckSelect: NextPage = () => {
  return (
    <div className="select is-primary is-rounded mb-2">
      <select data-testid="selectedDeck">
        <option value="fibonacci">Fibonacci</option>
      </select>
    </div>
  )
}

export default DeckSelect