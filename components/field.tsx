import { NextPage } from "next";
import Card from './card';

interface MemberEstimates {
  [prop: string]: any
}

interface Props {
  memberEstimates: MemberEstimates
}

const Field: NextPage<Props> = ({memberEstimates}) => {
  return (
    <div className="box has-background-success is-flex is-flex-wrap-wrap is-justify-content-center">
      {
        Object.keys(memberEstimates).map(memberId =>
          <Card key={memberId} estimate={memberEstimates[memberId]} />
        )
      }
    </div>
  )
}

export default Field