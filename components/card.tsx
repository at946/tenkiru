import { NextPage } from "next";

interface Style {
  [prop: string]: any
}

interface Props {
  number: number | null
  additionalClassName?: string
  additionalStyle?: Style
}

const Card: NextPage<Props> = ({ number, additionalClassName, additionalStyle }) => {
  const className: string = `
    box
    is-flex
    is-justify-content-center
    is-align-items-center
    is-size-3
    has-text-weight-bold
    m-2
  `

  const style: Style = {
    width: '100px',
    minWidth: '100px',
    aspectRatio: '1 / 1.4',
  }

  return (
    <div
      className={`${className} ${additionalClassName || ''}`}
      style={{...style, ...additionalStyle }}
    >
      { number }
    </div>
  )
}

export default Card