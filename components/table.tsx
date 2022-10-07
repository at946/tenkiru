import { NextPage } from "next";
import TableCard from './tableCard';

interface MemberEstimates {
  [prop: string]: any
}

interface Props {
  memberEstimates: MemberEstimates
}

const Table: NextPage<Props> = ({memberEstimates}) => {
  return (
    <div className="box has-background-success is-flex is-flex-wrap-wrap is-justify-content-center">
      {
        Object.keys(memberEstimates).map(memberId =>
          <TableCard
            key={memberId}
            state={memberEstimates[memberId] === null ? 'none' : 'close'}
            number={memberEstimates[memberId]}
          />
        )
      }
    </div>
  )
}

export default Table