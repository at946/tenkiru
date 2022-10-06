import { NextPage } from "next";

interface Props {
  estimate: number
}

const Card: NextPage<Props> = ({ estimate }) => {
  return (
    <div className="box is-flex is-justify-content-center is-align-items-center is-size-3 has-text-weight-bold m-2" style={{ width: '100px', aspectRatio: '1 / 1.4' }}>
      { estimate || '?' }
    </div>
  )
}

export default Card