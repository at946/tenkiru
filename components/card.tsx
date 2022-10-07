import { NextPage } from "next";

interface Props {
  val: number
}

const Card: NextPage<Props> = ({ val }) => {
  return (
    <div className="box is-flex is-justify-content-center is-align-items-center is-size-3 has-text-weight-bold m-2" style={{ width: '100px', minWidth: '100px', aspectRatio: '1 / 1.4', border: 'solid 1px lightgrey' }}>
      { val || '?' }
    </div>
  )
}

export default Card