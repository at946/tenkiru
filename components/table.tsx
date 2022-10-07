import { NextPage } from "next";
import TableCard from './tableCard';

interface MembersCards {
  [prop: string]: number | string | null
}

interface Props {
  membersCards: MembersCards
}

const Table: NextPage<Props> = ({membersCards}) => {
  return (
    <div className="box has-background-success is-flex is-flex-wrap-wrap is-justify-content-center">
      {
        Object.keys(membersCards).map(memberId =>
          <TableCard
            key={memberId}
            state={membersCards[memberId] === null ? 'none' : 'close'}
            value={membersCards[memberId]}
          />
        )
      }
    </div>
  )
}

export default Table