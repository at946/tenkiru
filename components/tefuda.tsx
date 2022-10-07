import { NextPage } from "next";
import Card from './card';

const Tefuda: NextPage = () => {
  return (
    <div className="is-flex" style={{ overflowX: 'scroll' }}>
      {
        [1, 2, 3, 5, 8, 13, 21].map(val =>
          <Card key={val} val={val} />
        )
      }
    </div>
  )
}

export default Tefuda